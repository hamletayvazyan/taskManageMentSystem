<?php

namespace App\Http\Controllers;

use App\Http\Resources\HomeTasksCollection;
use App\Models\Task;

class HomeController extends Controller
{
    /**
     * @return HomeTasksCollection
     */
    public function index()
    {
        return new HomeTasksCollection(Task::all());
    }
}
