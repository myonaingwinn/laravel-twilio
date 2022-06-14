<?php

namespace App\Http\Controllers\api\v1\CustomObject;

class RoomData
{
    public function getRoomData($twilio)
    {
        $rooms = (array) $twilio->video->v1->rooms
            ->read(["status" => "in-progress"]);

        foreach ($rooms as $record) {
            $participant[] = $record->participants;

            $record->name = $record->uniqueName;
            $record->id = $record->sid;
            $record->participant = count($participant);
            $record->maxParticipant = $record->maxParticipants;
            $record->type = $record->type;
            $record->description = $record->statusCallback;
            $record->emptyRoomTimeout = $record->emptyRoomTimeout;
        }

        $result = (array('Room List' => $rooms));

        return $result;
    }
}
