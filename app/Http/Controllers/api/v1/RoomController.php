<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use Twilio\Jwt\AccessToken;
use Twilio\Jwt\Grants\VideoGrant;
use Twilio\Rest\Client;
use App\Models\Room\RoomList;
use App\Http\Requests\TokenRequest;
use App\Http\Requests\TokenRequest as CreateRoomRequest;

class RoomController extends Controller
{
    private $sid, $apiKey, $apiSecret, $authToken;

    public function __construct()
    {
        $this->sid = config('services.twilio.sid');
        $this->authToken = config('services.twilio.auth_token');
        $this->apiKey = config('services.twilio.api_key');
        $this->apiSecret = config('services.twilio.api_secret');
    }

    public function getToken(TokenRequest $request)
    {
        $identity = $request->identity;
        $token = new AccessToken(
            $this->sid,
            $this->apiKey,
            $this->apiSecret,
            3600,
            $identity
        );

        $grant = new VideoGrant();
        $grant->setRoom($request->room);
        $token->addGrant($grant);

        return ['token' => $token->toJWT()];
    }

    public function createRoom(CreateRoomRequest $request)
    {
        $twilio = new Client($this->sid, $this->authToken);

        try {
            if ($request->roomType == "peer-to-peer") {
                if ($request->maxParticipants > 10) {
                    return response()->json('Max Participant number cannot be grater than 10 in Peer-to-Peer Room Type', 400);
                } else {
                    $twilio->video->v1->rooms->create([
                        "uniqueName" => $request->room,
                        "type" => (empty($request->roomType)) ? 'group' : $request->roomType,
                        "MaxParticipants" => (empty($request->maxParticipants)) ? '50' : $request->maxParticipants,
                        "statusCallback" => (empty($request->description)) ? 'null' : $request->description,
                        "emptyRoomTimeout" => (empty($request->emptyRoomTimeout)) ? '1' : $request->emptyRoomTimeout,
                    ]);
                    echo "Room Created with peer-to-peer type";
                }
            } else {
                $twilio->video->v1->rooms->create([
                    "uniqueName" => $request->room,
                    "type" => (empty($request->roomType)) ? 'group' : $request->roomType,
                    "MaxParticipants" => (empty($request->maxParticipants)) ? '50' : $request->maxParticipants,
                    "statusCallback" => (empty($request->description)) ? 'null' : $request->description,
                    "emptyRoomTimeout" => (empty($request->emptyRoomTimeout)) ? '1' : $request->emptyRoomTimeout,
                ]);
                echo "Room Created with group type!";
            }
        } catch (\Exception $e) {
            echo $e->getMessage();
        }

        $identity = $request->identity;
        $token = new AccessToken(
            $this->sid,
            $this->apiKey,
            $this->apiSecret,
            3600,
            $identity
        );

        $grant = new VideoGrant();
        $grant->setRoom($request->room);
        $token->addGrant($grant);

        return ['token' => $token->toJWT()];
    }

    public function getRoomList()
    {
        $twilio = new Client($this->sid, $this->authToken);

        $obj = new RoomList();
        $roomList = $obj->getRoomData($twilio);

        return response()->json(["roomList" => $roomList], 200);
    }
}
