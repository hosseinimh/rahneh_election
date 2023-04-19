<?php

namespace App\Services;

use App\Constants\ErrorCode;
use App\Constants\VotedType;
use App\Http\Resources\Voter\VoterResource;
use App\Models\Voter as Model;
use App\Models\Voter;
use Illuminate\Support\Facades\DB;
use Exception;
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

    public function getByNotShareholderNationalCode(string $nationalCode): mixed
    {
        return Model::leftJoin('tbl_users', 'user_id', '=', 'tbl_users.id')
            ->leftJoin('tbl_voters AS voters1', 'tbl_voters.voter_id_1', '=', 'voters1.id')
            ->leftJoin('tbl_voters AS voters2', 'tbl_voters.voter_id_2', '=', 'voters2.id')
            ->leftJoin('tbl_voters AS voters3', 'tbl_voters.voter_id_3', '=', 'voters3.id')
            ->where('tbl_voters.not_shareholder_national_code', $nationalCode)
            ->select('tbl_voters.*', 'tbl_users.username', 'voters1.name AS voter_1_name', 'voters1.family AS voter_1_family', 'voters1.national_code AS voter_1_national_code', 'voters2.name AS voter_2_name', 'voters2.family AS voter_2_family', 'voters2.national_code AS voter_2_national_code', 'voters3.name AS voter_3_name', 'voters3.family AS voter_3_family', 'voters3.national_code AS voter_3_national_code')
            ->first();
    }

    public function getPaginate(string $name, string $nationalCode, int $page, int $pageItems): mixed
    {
        return Model::leftJoin('tbl_users', 'user_id', '=', 'tbl_users.id')
            ->leftJoin('tbl_voters AS voters1', 'tbl_voters.voter_id_1', '=', 'voters1.id')
            ->leftJoin('tbl_voters AS voters2', 'tbl_voters.voter_id_2', '=', 'voters2.id')
            ->leftJoin('tbl_voters AS voters3', 'tbl_voters.voter_id_3', '=', 'voters3.id')
            ->where(function ($query) use ($name) {
                $query->where('tbl_voters.name', 'LIKE', '%' . $name . '%')
                    ->orWhere('tbl_voters.family', 'LIKE', '%' . $name . '%');
            })
            ->where('tbl_voters.national_code', 'LIKE', '%' . $nationalCode . '%')
            ->select('tbl_voters.*', 'tbl_users.username', 'voters1.name AS voter_1_name', 'voters1.family AS voter_1_family', 'voters1.national_code AS voter_1_national_code', 'voters2.name AS voter_2_name', 'voters2.family AS voter_2_family', 'voters2.national_code AS voter_2_national_code', 'voters3.name AS voter_3_name', 'voters3.family AS voter_3_family', 'voters3.national_code AS voter_3_national_code')
            ->orderBy('tbl_voters.family', 'ASC')->orderBy('tbl_voters.name', 'ASC')->orderBy('tbl_voters.id', 'ASC')->skip(($page - 1) * $pageItems)->take($pageItems)->get();
    }

    public function getVotedPaginate(string $name, string $nationalCode, int $votedType, int $page, int $pageItems): mixed
    {
        $query = Model::leftJoin('tbl_users', 'user_id', '=', 'tbl_users.id')
            ->leftJoin('tbl_voters AS voters1', 'tbl_voters.voter_id_1', '=', 'voters1.id')
            ->leftJoin('tbl_voters AS voters2', 'tbl_voters.voter_id_2', '=', 'voters2.id')
            ->leftJoin('tbl_voters AS voters3', 'tbl_voters.voter_id_3', '=', 'voters3.id')
            ->where(function ($query) use ($name) {
                $query->where('tbl_voters.name', 'LIKE', '%' . $name . '%')
                    ->orWhere('tbl_voters.family', 'LIKE', '%' . $name . '%');
            })
            ->where('tbl_voters.national_code', 'LIKE', '%' . $nationalCode . '%')
            ->whereNotNull('tbl_voters.voted_at');
        if ($votedType !== VotedType::NOT_VOTED) {
            $query = $query->where('tbl_voters.voted_type', $votedType);
        }
        return $query->select('tbl_voters.*', 'tbl_users.username', 'voters1.name AS voter_1_name', 'voters1.family AS voter_1_family', 'voters1.national_code AS voter_1_national_code', 'voters2.name AS voter_2_name', 'voters2.family AS voter_2_family', 'voters2.national_code AS voter_2_national_code', 'voters3.name AS voter_3_name', 'voters3.family AS voter_3_family', 'voters3.national_code AS voter_3_national_code')
            ->orderBy('tbl_voters.family', 'ASC')->orderBy('tbl_voters.name', 'ASC')->orderBy('tbl_voters.id', 'ASC')->skip(($page - 1) * $pageItems)->take($pageItems)->get();
    }

    public function personalVote(Model $model, int $userId): bool
    {
        $this->checkVoteOnce($model);
        $data = [
            'voted_type' => VotedType::PERSONAL,
            'user_id' => $userId,
            'voted_at' => date('Y-m-d H:i:s'),
        ];

        return $model->update($data);
    }

    public function proxicalVote(Model $model, string $nationalCode, int $userId): bool
    {
        try {
            $this->checkVoteOnce($model);
            $voter = $this->getByNationalCode($nationalCode);
            $this->checkVoterExists($voter);
            $this->checkVotersNotSame($model, $voter);
            $this->checkVoterVoted($voter);
            $index = $this->getProxyIndex($voter);
            DB::beginTransaction();
            $data = [
                'voted_type' => VotedType::PROXICAL,
                'user_id' => $userId,
                'voted_at' => date('Y-m-d H:i:s'),
            ];
            $model->update($data);
            $data = [
                'voter_id_' . $index => $model->id,
            ];
            $voter->update($data);
            DB::commit();
            return true;
        } catch (PDOException) {
            DB::rollBack();
            return false;
        }
    }

    public function notShareholderVote(Model $model, string $nationalCode, string $name, string $family, int $userId): bool
    {
        $this->checkVoteOnce($model);
        $voter = $this->getByNationalCode($nationalCode);
        $this->checkVoterNotExists($voter);
        $voter = $this->getByNotShareholderNationalCode($nationalCode);
        $this->checkNotShareholderVoteOnce($voter);
        $data = [
            'voted_type' => VotedType::NOT_SHAREHOLDER,
            'user_id' => $userId,
            'voted_at' => date('Y-m-d H:i:s'),
            'not_shareholder_national_code' => $nationalCode,
            'not_shareholder_name' => $name,
            'not_shareholder_family' => $family,
        ];

        return $model->update($data);
    }

    public function voteForShareholder(Model $model, string $nationalCode, int $userId): bool
    {
        try {
            $this->checkVoterVoted($model);
            $voter = $this->getByNationalCode($nationalCode);
            $this->checkVoterExists($voter);
            $this->checkVotersNotSame($model, $voter);
            $this->checkVoteOnce($voter);
            $index = $this->getProxyIndex($model);
            DB::beginTransaction();
            $data = [
                'voter_id_' . $index => $voter->id,
            ];
            $model->update($data);
            $data = [
                'voted_type' => VotedType::PROXICAL,
                'user_id' => $userId,
                'voted_at' => date('Y-m-d H:i:s'),
            ];
            $voter->update($data);
            DB::commit();
            return true;
        } catch (PDOException) {
            DB::rollBack();
            return false;
        }
    }

    public function count(string $name, string $nationalCode): int
    {
        return Model::leftJoin('tbl_users', 'user_id', '=', 'tbl_users.id')
            ->leftJoin('tbl_voters AS voters1', 'tbl_voters.voter_id_1', '=', 'voters1.id')
            ->leftJoin('tbl_voters AS voters2', 'tbl_voters.voter_id_2', '=', 'voters2.id')
            ->leftJoin('tbl_voters AS voters3', 'tbl_voters.voter_id_3', '=', 'voters3.id')
            ->where(function ($query) use ($name) {
                $query->where('tbl_voters.name', 'LIKE', '%' . $name . '%')
                    ->orWhere('tbl_voters.family', 'LIKE', '%' . $name . '%');
            })
            ->where('tbl_voters.national_code', 'LIKE', '%' . $nationalCode . '%')
            ->count();
    }
    public function countVoted(string $name = '', string $nationalCode = '', int $votedType = VotedType::NOT_VOTED): int
    {
        $query = Model::where(function ($query) use ($name) {
            $query->where('name', 'LIKE', '%' . $name . '%')
                ->orWhere('family', 'LIKE', '%' . $name . '%');
        })->where('national_code', 'LIKE', '%' . $nationalCode . '%')->whereNotNull('voted_at');
        if ($votedType !== VotedType::NOT_VOTED) {
            $query = $query->where('voted_type', $votedType);
        }
        return $query->count();
    }

    public function countPersonalVoted(): int
    {
        return Model::where('voted_type', VotedType::PERSONAL)->whereNotNull('voted_at')->count();
    }

    public function countProxicalVoted(): int
    {
        return Model::where('voted_type', VotedType::PROXICAL)->whereNotNull('voted_at')->count();
    }

    public function countNotShareholderVoted(): int
    {
        return Model::where('voted_type', VotedType::NOT_SHAREHOLDER)->whereNotNull('voted_at')->count();
    }

    private function checkVoterExists(mixed $voter)
    {
        if (!$voter || !($voter instanceof Voter)) {
            throw new Exception(__('voter.voter_not_found'), ErrorCode::CUSTOM_ERROR);
        }
    }

    private function checkVoterNotExists(mixed $voter)
    {
        if ($voter && $voter instanceof Voter) {
            throw new Exception(__('voter.voter_found'), ErrorCode::CUSTOM_ERROR);
        }
    }

    private function checkVotersNotSame(Model $model, Model $voter)
    {
        if ($model->id === $voter->id) {
            throw new Exception(__('voter.voters_same'), ErrorCode::CUSTOM_ERROR);
        }
    }

    private function checkVoteOnce(Model $model)
    {
        if ($model->voted_at) {
            throw new Exception(__('voter.voter_voted'), ErrorCode::CUSTOM_ERROR);
        }
    }

    private function checkNotShareholderVoteOnce(mixed $voter)
    {
        if ($voter && $voter instanceof Voter) {
            throw new Exception(__('voter.not_shareholder_voter_voted'), ErrorCode::CUSTOM_ERROR);
        }
    }

    private function checkVoterVoted(Model $voter)
    {
        if (!$voter->voted_at) {
            throw new Exception(__('voter.voter_should_vote_first'), ErrorCode::CUSTOM_ERROR);
        }
    }

    private function getProxyIndex(Model $model): int
    {
        if (!$model->voter_id_1) {
            return 1;
        }
        if (!$model->voter_id_2) {
            return 2;
        }
        if (!$model->voter_id_3) {
            return 3;
        }

        throw new Exception(__('voter.voter_voted_proxical'), ErrorCode::CUSTOM_ERROR);
    }

    private function checkAndFillVoterIfProxical(mixed $record)
    {
        if ($record && $record->voted_type === VotedType::PROXICAL) {
            $voter = Model::where('voter_id_1', $record->id)->orWhere('voter_id_2', $record->id)->orWhere('voter_id_3', $record->id)
                ->first();
            if ($voter) {
                $record['voter'] = new VoterResource($voter);
            }
        }
    }
}
