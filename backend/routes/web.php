<?php

use App\Http\Controllers\Auth\LoginUserController;
use App\Http\Controllers\Auth\RegisterUserController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

// Route::get('/sanctum/csrf-cookie', function () {
//     return response()->noContent();
// });

// Route::middleware('web')->group(function () {
//     Route::post('/login', [LoginUserController::class, 'login']);
//     Route::post('/register', [RegisterUserController::class, 'register']);
// });