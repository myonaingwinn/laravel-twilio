<?php

namespace App\Http\Controllers\api\v1\CustomObject;

class RoomData
{
    public function getRoomData($twilio)
    {
        $rooms = (array) $twilio->video->v1->rooms
            ->read(["status" => "completed"]);

        foreach ($rooms as $record) {
            $id[] = $record->sid;
            $name[] = $record->uniqueName;
            $participant[] = $record->participants;
            $maxParticipant[] = $record->maxParticipants;

            $record->name = $record->uniqueName;
            $record->id = $record->sid;
            $record->participant = count($participant);
            $record->maxParticipant = $record->maxParticipants;
        }

        $result = (array('Room List' => $rooms));

        return $result;
    }
}
