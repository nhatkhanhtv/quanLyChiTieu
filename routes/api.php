<?php

use Illuminate\Http\Request;

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

// Route::group([
//     'prefix'     => 'api',    
//     'namespace'  => 'App\Http\Controllers\Api',
// ], function () { // custom admin routes
//     CRUD::resource('thuChi', 'ThongTinThuChiController');
// }); // this should be the absolute last line of this file