<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class TaskCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $response = [
            'tasks' => [],
            'assigned' => [],
        ];
        $assigned = auth()->user()->assignedTasks;
        foreach ($this->collection as $value){
            $response['tasks'][] = [
                'id' => $value->id,
                'title' => $value->title,
                'assigned' => $value->assigned,
                'status' => $value->status,
                'created_by' => $value->createdBy->name,
            ];
        }
        foreach ($assigned as $item){
            $response['tasks'][] = [
                'id' => $item->id,
                'title' => $item->title,
                'assigned' => $item->assigned,
                'status' => $item->status,
                'created_by' => $item->createdBy->name,
            ];
        }
        $response['assigned'] = $assigned;
        return $response;
    }
}
