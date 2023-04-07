<?php

namespace App\Services;

use App\Constants\Role;
use App\Models\Voter as Model;

class VoterService
{
    public function get(int $id): mixed
    {
        return
            Model::leftJoin('tbl_users', 'user_id', '=', 'tbl_users.id')
            ->leftJoin('tbl_voters AS voters1', 'tbl_voters.voter_id_1', '=', 'voters1.id')
            ->leftJoin('tbl_voters AS voters2', 'tbl_voters.voter_id_2', '=', 'voters2.id')
            ->leftJoin('tbl_voters AS voters3', 'tbl_voters.voter_id_3', '=', 'voters3.id')
            ->where('tbl_voters.id', $id)
            ->select('tbl_voters.*', 'tbl_users.username', 'voters1.name AS voter_1_name', 'voters1.family AS voter_1_family', 'voters1.national_code AS voter_1_national_code', 'voters2.name AS voter_2_name', 'voters2.family AS voter_2_family', 'voters2.national_code AS voter_2_national_code', 'voters3.name AS voter_3_name', 'voters3.family AS voter_3_family', 'voters3.national_code AS voter_3_national_code')
            ->first();
    }

    public function getPaginate(string $name, string $nationalCode, int $page, int $pageItems): mixed
    {
        return Model::leftJoin('tbl_users', 'user_id', '=', 'tbl_users.id')
            ->leftJoin('tbl_voters AS voters1', 'tbl_voters.voter_id_1', '=', 'voters1.id')
            ->leftJoin('tbl_voters AS voters2', 'tbl_voters.voter_id_2', '=', 'voters2.id')
            ->leftJoin('tbl_voters AS voters3', 'tbl_voters.voter_id_3', '=', 'voters3.id')
            ->where('tbl_voters.name','LIKE', '%' . $name . '%')
            ->where('tbl_voters.national_code', 'LIKE', '%'. $nationalCode . '%')
            ->select('tbl_voters.*', 'tbl_users.username', 'voters1.name AS voter_1_name', 'voters1.family AS voter_1_family', 'voters1.national_code AS voter_1_national_code', 'voters2.name AS voter_2_name', 'voters2.family AS voter_2_family', 'voters2.national_code AS voter_2_national_code', 'voters3.name AS voter_3_name', 'voters3.family AS voter_3_family', 'voters3.national_code AS voter_3_national_code')
            ->orderBy('tbl_voters.family', 'ASC')->orderBy('tbl_voters.name', 'ASC')->orderBy('tbl_voters.id', 'ASC')->skip(($page - 1) * $pageItems)->take($pageItems)->get();
    }

    public function update(Model $model, string $name, int $role, int $isActive): bool
    {
        $role = ($role >= Role::USER && $role <= Role::ADMINISTRATOR) ? $role : Role::USER;
        $isActive = $isActive > 0 ? 1 : 0;
        $data = [
            'name' => $name,
            'role' => $role,
            'is_active' => $isActive,
        ];

        return $model->update($data);
    }

    public function count(string $name, string $nationalCode): int
    {
        return Model::leftJoin('tbl_users', 'user_id', '=', 'tbl_users.id')
            ->leftJoin('tbl_voters AS voters1', 'tbl_voters.voter_id_1', '=', 'voters1.id')
            ->leftJoin('tbl_voters AS voters2', 'tbl_voters.voter_id_2', '=', 'voters2.id')
            ->leftJoin('tbl_voters AS voters3', 'tbl_voters.voter_id_3', '=', 'voters3.id')
            ->where('tbl_voters.name','LIKE', '%' . $name . '%')
            ->where('tbl_voters.national_code', 'LIKE', '%'. $nationalCode . '%')
            ->count();
    }
    public function countVoted(): int
    {
        return Model::whereNotNull('voted_at')->count();
    }
}
