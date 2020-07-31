<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\TaskCollection;
use App\Models\Task;
use App\User;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    /**
     * @return TaskCollection
     */
    public function index()
    {
        $tasks = Task::where('user_id', auth()->user()->id)->get();
        return new TaskCollection($tasks);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * @param Request $request
     * @param $id
     */
    public function changeStatus(Request $request, $id)
    {
        $this->validate($request, [
            'status' => 'required'
        ]);
        $task = Task::with('assignedSpecial')->find($id);
        if ((auth()->user()->id !== $task->user_id) &&  (auth()->user()->id !== $task->assignedSpecial[0]->id ))
            return response()->json([
                'success' => false,
                'message' => 'you dont have permission',
            ], 401);
        $task->update($request->all());
        return response()->json([
            'success' => true,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $inputs = $request->except('users');
        $inputs['user_id'] = auth()->user()->id;
        $inputs['status'] = 'new';
        $tasks = Task::create($inputs);
        $tasks->assigned()->attach($request->users);

        return response()->json([
            'success' => true
        ]);

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
     * Show the form for editing the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $task = Task::with('assigned')->where('id', $id)->where('user_id', auth()->user()->id)->first();
        $users = User::all()->except([auth()->user()->id]);

        if (!$task)
            return response()->json([
                'success' => false,
                'message' => 'you dont have permission'
            ], 401);
        return response()->json([
            'task' => $task,
            'users' => $users,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $inputs = $request->except('users');
        $task = Task::where('id', $id)->where('user_id', auth()->user()->id)->first();
        if (!$task)
            return response()->json([
                'success' => false,
                'message' => 'you dont have permission'
            ]);
        $task->update($inputs);
        $task->assigned()->sync($request->users);
        return response()->json([
            'success' => true
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $task = Task::find($id);
        $task->delete();
        return response()->json([
            'success' => true
        ]);
    }
}
