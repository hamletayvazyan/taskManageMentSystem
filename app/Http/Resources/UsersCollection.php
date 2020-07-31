<?php

namespace App\Http\Resources;

use App\User;
use Illuminate\Http\Resources\Json\ResourceCollection;

class UsersCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  User  $request
     * @return array
     */
    public function toArray($request)
    {
        $users = User::all()->except([auth()->user()->id]);
        return $users;
    }
}
