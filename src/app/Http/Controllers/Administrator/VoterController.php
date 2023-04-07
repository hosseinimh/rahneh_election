<?php

namespace App\Http\Controllers\Administrator;

use App\Http\Controllers\Controller;
use App\Http\Requests\Voter\IndexVotersRequest;
use App\Http\Requests\Voter\SearchVoterByNationalCodeRequest;
use App\Http\Requests\Voter\UpdateVoterRequest;
use App\Http\Resources\Voter\VoterResource;
use App\Models\Voter as Model;
use App\Packages\JsonResponse;
use App\Services\VoterService;
use Illuminate\Http\JsonResponse as HttpJsonResponse;

class VoterController extends Controller
{
    public function __construct(JsonResponse $response, public VoterService $service)
    {
        parent::__construct($response);
    }

    public function index(IndexVotersRequest $request): HttpJsonResponse
    {
        $name = $request->name ?? '';
        $nationalCode = $request->national_code ?? '';
        $items = [
            'items' => VoterResource::collection($this->service->getPaginate($name, $nationalCode, $request->_pn, $request->_pi)),
            'itemsCount' => $this->service->count($name, $nationalCode),
            'votedCount' => $this->service->countVoted()
        ];
        return $this->onItems($items);
    }

    public function show(Model $model): HttpJsonResponse
    {
        return $this->onItem($this->service->get($model->id));
    }

    public function showByNationalCode(SearchVoterByNationalCodeRequest $request): HttpJsonResponse
    {
        return $this->onItem($this->service->getByNationalCode($request->national_code));
    }

    public function vote(Model $model): HttpJsonResponse
    {
        return $this->onUpdate($this->service->vote($model, auth()->user()->id));
    }

    public function proxicalVote(Model $model, Model $voter): HttpJsonResponse
    {
        return $this->onUpdate($this->service->proxicalVote($model, $voter, auth()->user()->id));
    }
}
