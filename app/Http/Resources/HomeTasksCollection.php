<?php

namespace App\Http\Resources;


use Illuminate\Http\Resources\Json\ResourceCollection;

class HomeTasksCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $response = [];
        foreach ($this->collection as $value){
            $response[] = [
                'id' => $value->id,
                'title' => $value->title,
                'assigned' => $value->assignedSpecial()->first() ? $value->assignedSpecial()->first() : '',
                'status' => $value->status,
                'created_by' => ['id'=>$value->createdBy->id, 'name'=>$value->createdBy->name],
            ];
        }
        return $response;
    }
}
