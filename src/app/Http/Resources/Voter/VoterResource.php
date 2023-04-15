<?php

namespace App\Http\Resources\Voter;

use App\Constants\VotedType;
use App\Facades\Helper;
use Illuminate\Http\Resources\Json\JsonResource;

class VoterResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => intval($this->id),
            'nationalCode' => Helper::localeNumbers($this->national_code),
            'name' => Helper::localeNumbers($this->name) ?? '',
            'family' => Helper::localeNumbers($this->family) ?? '',
            'voterId1' => intval($this->voter_id_1),
            'voter1Name' => Helper::localeNumbers($this->voter_1_name) ?? '',
            'voter1Family' => Helper::localeNumbers($this->voter_1_family) ?? '',
            'voter1NationalCode' => Helper::localeNumbers($this->voter_1_national_code),
            'voterId2' => intval($this->voter_id_2),
            'voter2Name' => Helper::localeNumbers($this->voter_2_name) ?? '',
            'voter2Family' => Helper::localeNumbers($this->voter_2_family) ?? '',
            'voter2NationalCode' => Helper::localeNumbers($this->voter_2_national_code),
            'voterId3' => intval($this->voter_id_3),
            'voter3Name' => Helper::localeNumbers($this->voter_3_name) ?? '',
            'voter3Family' => Helper::localeNumbers($this->voter_3_family) ?? '',
            'voter3NationalCode' => Helper::localeNumbers($this->voter_3_national_code),
            'userId' => intval($this->user_id),
            'username' => $this->username,
            'votedType' => intval($this->voted_type),
            'votedTypeText' => $this->getVotedType(intval($this->voted_type)),
            'votedAt' => $this->voted_at,
            'votedAtFa' => $this->voted_at ? Helper::localeNumbers(Helper::faDate($this->voted_at)) : '',
            'proxicalCount' => $this->proxicalCount(),
            'voter' => $this->voted_type === VotedType::PROXICAL ? new VoterResource($this->voter) : null,
            'notShareholderNationalCode' => Helper::localeNumbers($this->not_shareholder_national_code),
            'notShareholderName' => Helper::localeNumbers($this->not_shareholder_name) ?? '',
            'notShareholderFamily' => Helper::localeNumbers($this->not_shareholder_family) ?? '',
        ];
    }

    private function getVotedType(int $votedType)
    {
        if (in_array($votedType, [0, 1, 2, 3])) {
            return __('voter.voted_type_' . $votedType);
        }

        return __('voter.voted_type__undefined');
    }

    private function proxicalCount()
    {
        $count = 0;
        $count += $this->voter_id_1 ? 1 : 0;
        $count += $this->voter_id_2 ? 1 : 0;
        $count += $this->voter_id_3 ? 1 : 0;
        return $count;
    }
}
