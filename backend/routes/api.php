<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\CreditApplicationController;
use App\Http\Controllers\API\CreditController;
use App\Http\Controllers\API\UserController;
use Illuminate\Support\Facades\Route;

//client
Route::post('/register',[AuthController::class,'register']);

//login
Route::post('/login',[AuthController::class,'login']);

Route::middleware('auth:sanctum')->group(function(){
    Route::get('/logout',[AuthController::class,'logout']);

    //users
    Route::get('/users/{role?}', [UserController::class,'index'])->name('user.index')->middleware('can:user.index');
    Route::get('/users-show/{id}', [UserController::class,'show'])->name('user.show')->middleware('can:user.show');
    Route::post('/users', [UserController::class,'store'])->name('user.create')->middleware('can:user.create');
    Route::put('/users/{id}', [UserController::class,'update'])->name('user.update')->middleware('can:user.update');
    Route::delete('/users/{id}', [UserController::class,'destroy'])->name('user.delete')->middleware('can:user.delete');

    //credit application
    Route::post('/application', [CreditApplicationController::class,'store'])->name('application.create')->middleware('can:application.create');
    Route::get('/application/{id}', [CreditApplicationController::class,'show'])->name('application.show')->middleware('can:application.show');
    Route::put('/application/{id}', [CreditApplicationController::class,'update'])->name('application.update')->middleware('can:application.update');
    Route::get('/application-role/{role}/{user_id?}',[CreditApplicationController::class,'showByRole'])->name('application.showByRole')->middleware('can:application.showByRole');

    //credit
    Route::get('/credit-role/{role}/{user_id?}', [CreditController::class,'index'])->name('credit.index')->middleware('can:credit.index');

});

