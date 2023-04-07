<?php

use App\Http\Controllers\Administrator\DashboardController;
use App\Http\Controllers\Administrator\ErrorController;
use App\Http\Controllers\Administrator\UserController;
use App\Http\Controllers\Administrator\VoterController;
use Illuminate\Support\Facades\Route;

// not logged users
Route::middleware(['cors'])->group(function () {
    Route::post('users/login', [UserController::class, 'login']);
    Route::post('errors/store', [ErrorController::class, 'store']);
});

// 'administrator' type users
Route::middleware(['auth:sanctum', 'auth.administrator'])->group(function () {
    Route::post('dashboard', [DashboardController::class, 'index']);

    Route::post('users', [UserController::class, 'index']);
    Route::post('users/show/{model}', [UserController::class, 'show']);
    Route::post('users/store', [UserController::class, 'store']);
    Route::post('users/update/{model}', [UserController::class, 'update']);
    Route::post('users/change_password/{model}', [UserController::class, 'changePassword']);

    Route::post('voters', [VoterController::class, 'index']);
    Route::post('voters/show/nc', [VoterController::class, 'showByNationalCode']);
    Route::post('voters/show/{model}', [VoterController::class, 'show']);
    Route::post('voters/vote/{model}', [VoterController::class, 'vote']);
    Route::post('voters/proxical_vote/{model}/{voter}', [VoterController::class, 'proxicalVote']);
});
