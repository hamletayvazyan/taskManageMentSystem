<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

//Route::get('/{any}', function () {
//    return view('home');
//});
Route::get('/{all?}/{other?}/{last?}', function () {
    return view('home');
});
//Auth::routes(['verify' => false]);

//Route::any('{all?}/{any?}/{anything?}/{something?}' , function (){
//    return view('app');
//});
