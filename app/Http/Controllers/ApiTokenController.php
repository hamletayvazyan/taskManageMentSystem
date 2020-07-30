<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ApiTokenController extends Controller
{
    /**
     * Get the authenticated user's API token.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function index(Request $request)
    {
        return ['token' => $request->user()->remember_token];
    }
    /**
     * Update the authenticated user's API token.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function fillToken(Request $request)
    {
        $token = Str::random(80);

        $request->user()->forceFill([
            'remember_token' => hash('sha256', $token),
        ])->save();

        return ['token' => $token];
    }
    /**
     * Remove the authenticated user's API token.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function remove(Request $request)
    {
        $request->user()->forceFill([
            'remember_token' => null,
        ])->save();
        return ['message' => 'logged out'];
    }
}
