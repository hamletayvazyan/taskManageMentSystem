<?php

namespace App\Http\Controllers;

use App\Http\Resources\HomeTasksCollection;
use App\Models\Task;
use Illuminate\Http\Request;


class HomeController extends Controller
{
    /**
     * @return HomeTasksCollection
     */
    public function index()
    {
        return new HomeTasksCollection(Task::all());
    }
    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $task = Task::with('assignedSpecial', 'createdBy:id,name')
            ->where('id', $id)->first();
        if (!$task)
            return response()->json([
                'data' => '',
                'message' => 'Not Found'
            ], 404);
        return response()->json($task);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function search(Request $request)
    {
        $key = $request->input('key');
        $task = Task::with('assignedSpecial', 'createdBy:id,name')
            ->where('title','LIKE', "%$key%")
            ->orWhere('description','LIKE', "%$key%")
            ->get();
        if ($task->count() === 0)
            return response()->json([
                'data' => [],
                'message' => 'Not Found'
            ]);
        return response()->json($task);
    }
}
