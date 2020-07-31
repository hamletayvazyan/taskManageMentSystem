<?php

namespace App\Models;

use App\User;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $fillable = [
       'user_id', 'title', 'description', 'status'
    ];


    protected $hidden = [
        'pivot'
    ];
    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function assigned(){
        return $this->belongsToMany(User::class, 'assigned_tasks');
    }
    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function assignedSpecial(){
        return $this->belongsToMany(User::class, 'assigned_tasks')->select('users.id', 'users.name');
    }

    public function createdBy(){
        return $this->hasOne(User::class, 'id', 'user_id');
    }
    public function createdBySpecial(){
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
