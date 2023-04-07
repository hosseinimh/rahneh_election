<?php

namespace App\Http\Resources\Voter;

use App\Facades\Helper;
use Illuminate\Http\Resources\Json\JsonResource;

class VoterResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => intval($this->id),
            'name' => Helper::localeNumbers($this->name) ?? '',
            'family' => Helper::localeNumbers($this->family) ?? '',
            'nationalCode' => $this->national_code,
            'isNatural' => intval($this->is_natural),
            'voterId1' => intval($this->voter_id_1),
            'voter1Name' => Helper::localeNumbers($this->voter_1_name) ?? '',
            'voter1Family' => Helper::localeNumbers($this->voter_1_family) ?? '',
            'voter1NationalCode' => $this->voter_1_national_code,
            'voterId2' => intval($this->voter_id_2),
            'voter2Name' => Helper::localeNumbers($this->voter_2_name) ?? '',
            'voter2Family' => Helper::localeNumbers($this->voter_2_family) ?? '',
            'voter2NationalCode' => $this->voter_2_national_code,
            'voterId3' => intval($this->voter_id_3),
            'voter3Name' => Helper::localeNumbers($this->voter_3_name) ?? '',
            'voter3Family' => Helper::localeNumbers($this->voter_3_family) ?? '',
            'voter3NationalCode' => $this->voter_3_national_code,
            'userId' => intval($this->user_id),
            'votedAt' => $this->voted_at,
            'votedAtFa' => $this->voted_at ? Helper::faDate($this->voted_at) : '',
        ];
    }
}
