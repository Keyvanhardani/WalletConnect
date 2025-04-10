<?php

use App\Http\Controllers\Auth\Web3AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Web3 Authentication Routes
Route::post('/auth/web3', [Web3AuthController::class, 'authenticate']);
Route::post('/auth/web3/logout', [Web3AuthController::class, 'logout'])->middleware('auth:sanctum');
