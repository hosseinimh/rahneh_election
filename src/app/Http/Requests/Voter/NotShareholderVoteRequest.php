<?php

namespace App\Http\Requests\Voter;

use App\Constants\ErrorCode;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

class NotShareholderVoteRequest extends FormRequest
{
    protected function failedValidation(Validator $validator)
    {
        $response = new Response(['_result' => '0', '_error' => $validator->errors()->first(), '_errorCode' => ErrorCode::UPDATE_ERROR], 200);

        throw new ValidationException($validator, $response);
    }

    public function rules()
    {
        return [
            'national_code' => 'required|numeric|digits:10',
            'name' => 'required|min:2|max:50',
            'family' => 'required|min:2|max:50',
        ];
    }

    public function messages()
    {
        return [
            'national_code.required' => __('voter.national_code_required'),
            'national_code.numeric' => __('voter.national_code_numeric'),
            'national_code.digits' => __('voter.national_code_digits'),
            'name.required' => __('voter.name_required'),
            'name.min' => __('voter.name_min'),
            'name.max' => __('voter.name_max'),
            'family.required' => __('voter.family_required'),
            'family.min' => __('voter.family_min'),
            'family.max' => __('voter.family_max'),
        ];
    }
}
