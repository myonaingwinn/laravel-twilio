<?php

namespace App\Models\Room;

class RoomList
{
    public function getRoomData($twilio)
    {
        $rooms = (array) $twilio->video->v1->rooms
            ->read(["status" => "in-progress"], 10);

        foreach ($rooms as $record) {
            $totalParticipant[] = $record->participants;

            $record->name = $record->uniqueName;
            $record->id = $record->sid;
            $record->totalParticipant = count($totalParticipant);
            $record->maxParticipant = $record->maxParticipants;
            $record->roomType = $record->type;
            $record->description = $record->statusCallback;
            $record->emptyRoomTimeout = $record->emptyRoomTimeout;
        }

        return $rooms;
    }
}
