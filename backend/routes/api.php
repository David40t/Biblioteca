<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::apiResource('users', App\Http\Controllers\UserController::class);
Route::apiResource('authors', App\Http\Controllers\AuthorController::class);
Route::apiResource('genders', App\Http\Controllers\GenderController::class);
Route::apiResource('books', App\Http\Controllers\BookController::class);
Route::apiResource('loans', App\Http\Controllers\LoanController::class);