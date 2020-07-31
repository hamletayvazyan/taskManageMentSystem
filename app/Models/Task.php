<?php

namespace App\Models;

use App\User;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $fillable = [
       'user_id', 'title', 'description', 'status'
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function assigned(){
        return $this->belongsToMany(User::class, 'assigned_tasks');
    }
}
