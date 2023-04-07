<?php

namespace App\Services;

use App\Http\Resources\Voter\VoterResource;
use App\Models\Voter as Model;
use Exception;
use Illuminate\Support\Facades\DB;
use PDOException;

class VoterService
{
    public function get(int $id): mixed
    {
        $record = Model::leftJoin('tbl_users', 'user_id', '=', 'tbl_users.id')
            ->leftJoin('tbl_voters AS voters1', 'tbl_voters.voter_id_1', '=', 'voters1.id')
            ->leftJoin('tbl_voters AS voters2', 'tbl_voters.voter_id_2', '=', 'voters2.id')
            ->leftJoin('tbl_voters AS voters3', 'tbl_voters.voter_id_3', '=', 'voters3.id')
            ->where('tbl_voters.id', $id)
            ->select('tbl_voters.*', 'tbl_users.username', 'voters1.name AS voter_1_name', 'voters1.family AS voter_1_family', 'voters1.national_code AS voter_1_national_code', 'voters2.name AS voter_2_name', 'voters2.family AS voter_2_family', 'voters2.national_code AS voter_2_national_code', 'voters3.name AS voter_3_name', 'voters3.family AS voter_3_family', 'voters3.national_code AS voter_3_national_code')
            ->first();
        $this->checkAndFillVoterIfProxical($record);
        return $record;
    }

    public function getByNationalCode(string $nationalCode): mixed
    {
        $record = Model::leftJoin('tbl_users', 'user_id', '=', 'tbl_users.id')
            ->leftJoin('tbl_voters AS voters1', 'tbl_voters.voter_id_1', '=', 'voters1.id')
            ->leftJoin('tbl_voters AS voters2', 'tbl_voters.voter_id_2', '=', 'voters2.id')
            ->leftJoin('tbl_voters AS voters3', 'tbl_voters.voter_id_3', '=', 'voters3.id')
            ->where('tbl_voters.national_code', $nationalCode)
            ->select('tbl_voters.*', 'tbl_users.username', 'voters1.name AS voter_1_name', 'voters1.family AS voter_1_family', 'voters1.national_code AS voter_1_national_code', 'voters2.name AS voter_2_name', 'voters2.family AS voter_2_family', 'voters2.national_code AS voter_2_national_code', 'voters3.name AS voter_3_name', 'voters3.family AS voter_3_family', 'voters3.national_code AS voter_3_national_code')
            ->first();
        $this->checkAndFillVoterIfProxical($record);
        return $record;
    }

    public function getPaginate(string $name, string $nationalCode, int $page, int $pageItems): mixed
    {
        return Model::leftJoin('tbl_users', 'user_id', '=', 'tbl_users.id')
            ->leftJoin('tbl_voters AS voters1', 'tbl_voters.voter_id_1', '=', 'voters1.id')
            ->leftJoin('tbl_voters AS voters2', 'tbl_voters.voter_id_2', '=', 'voters2.id')
            ->leftJoin('tbl_voters AS voters3', 'tbl_voters.voter_id_3', '=', 'voters3.id')
            ->where(function ($query) use($name) {
                $query->where('tbl_voters.name', 'LIKE', '%' . $name . '%')
                ->orWhere('tbl_voters.family', 'LIKE', '%' . $name . '%');
            })
            ->where('tbl_voters.national_code', 'LIKE', '%'. $nationalCode . '%')
            ->select('tbl_voters.*', 'tbl_users.username', 'voters1.name AS voter_1_name', 'voters1.family AS voter_1_family', 'voters1.national_code AS voter_1_national_code', 'voters2.name AS voter_2_name', 'voters2.family AS voter_2_family', 'voters2.national_code AS voter_2_national_code', 'voters3.name AS voter_3_name', 'voters3.family AS voter_3_family', 'voters3.national_code AS voter_3_national_code')
            ->orderBy('tbl_voters.family', 'ASC')->orderBy('tbl_voters.name', 'ASC')->orderBy('tbl_voters.id', 'ASC')->skip(($page - 1) * $pageItems)->take($pageItems)->get();
    }

    public function vote(Model $model, int $userId): bool
    {
        try {
            $this->checkVoteOnce($model);
            $data = [
                'user_id' => $userId,
                'voted_at' => date('Y-m-d H:i:s'),
            ];

            return $model->update($data);
        } catch (Exception) {
            return false;
        }
    }

    public function proxicalVote(Model $model, Model $voter, int $userId): bool
    {
        try {
            DB::beginTransaction();
            $this->checkVoteOnce($model);
            $index = $this->getProxyIndex($voter);
            $data = [
                'is_natural' => 0,
                'user_id' => $userId,
                'voted_at' => date('Y-m-d H:i:s'),
            ];
            $model->update($data);
            $data = [
                'voter_id_'.$index => $model->id,
            ];
            $voter->update($data);
            DB::commit();
            return true;
        } catch (PDOException $e) {
            // Woopsy
            DB::rollBack();
            return false;
        } catch (Exception) {
            return false;
        }
    }

    public function count(string $name, string $nationalCode): int
    {
        return Model::leftJoin('tbl_users', 'user_id', '=', 'tbl_users.id')
            ->leftJoin('tbl_voters AS voters1', 'tbl_voters.voter_id_1', '=', 'voters1.id')
            ->leftJoin('tbl_voters AS voters2', 'tbl_voters.voter_id_2', '=', 'voters2.id')
            ->leftJoin('tbl_voters AS voters3', 'tbl_voters.voter_id_3', '=', 'voters3.id')
            ->where(function ($query) use($name) {
                $query->where('tbl_voters.name', 'LIKE', '%' . $name . '%')
                ->orWhere('tbl_voters.family', 'LIKE', '%' . $name . '%');
            })
            ->where('tbl_voters.national_code', 'LIKE', '%'. $nationalCode . '%')
            ->count();
    }
    public function countVoted(): int
    {
        return Model::whereNotNull('voted_at')->count();
    }

    private function checkVoteOnce(Model $model)
    {
        if ($model->voted_at){
            throw new Exception();
        }
    }

     private function getProxyIndex(Model $model): int
    {
        if (!$model->voter_id_1){
            return 1;
        }
        if (!$model->voter_id_2){
            return 2;
        }
        if (!$model->voter_id_3){
            return 3;
        }

        throw new Exception();
    }

    private function checkAndFillVoterIfProxical(mixed $record)
    {
        if ($record && $record->is_natural === 0) {
            $voter = Model::where('voter_id_1', $record->id)->orWhere('voter_id_2', $record->id)->orWhere('voter_id_3', $record->id)
                ->first();
            if ($voter) {
                $record['voter'] = new VoterResource($voter);
            }
        }
    }
}
