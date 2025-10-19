<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('api')->group(function () {
    Route::apiResource('users', App\Http\Controllers\UserController::class);
Route::apiResource('authors', App\Http\Controllers\AuthorController::class);
Route::apiResource('genders', App\Http\Controllers\GenderController::class);
Route::apiResource('books', App\Http\Controllers\BookController::class);
Route::apiResource('loans', App\Http\Controllers\LoanController::class);
Route::get('stats/books_more_loans_top_5', App\Http\Controllers\StatsController::class . '@books_more_loans_top_5');
Route::get('stats/loans_defeated', App\Http\Controllers\StatsController::class . '@loans_defeated');
Route::get('stats/users_loans', App\Http\Controllers\StatsController::class . '@users_loans');
Route::get('stats/loan_defeated', App\Http\Controllers\StatsController::class . '@loan_defeated');
Route::get('stats/books_loans', App\Http\Controllers\StatsController::class . '@books_loans');
});