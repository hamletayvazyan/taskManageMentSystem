<?php

use App\Http\Resources\UsersCollection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Auth::routes();
Route::group(['namespace' => 'Api', 'middleware' => 'auth:api'], function (){
    Route::resource('user_tasks', 'TaskController');
    Route::post('changeStatus/{id}', 'TaskController@changeStatus');
    Route::get('/users', function (Request $request){
        return new UsersCollection($request->user());
    });
});
Route::get('/tasks', 'HomeController@index');
Route::get('/show/{id}', 'HomeController@show');
Route::post('/search', 'HomeController@search');
Route::post('/checkLogin', 'HomeController@checkLogin');
