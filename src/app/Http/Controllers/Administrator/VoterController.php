<?php

namespace App\Http\Controllers\Administrator;

use App\Http\Controllers\Controller;
use App\Http\Requests\Voter\IndexVotersRequest;
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

    public function update(Model $model, UpdateVoterRequest $request): HttpJsonResponse
    {
        return $this->onUpdate($this->service->update($model, $request->name, $request->role, $request->is_active));
    }
}
