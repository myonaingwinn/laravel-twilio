<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Twilio\Jwt\AccessToken;
use Twilio\Jwt\Grants\VideoGrant;
use Illuminate\Support\Facades\Validator;
use Twilio\Rest\Client;

class RoomController extends Controller
{
    private $sid, $apiKey, $apiSecret, $auth_token;

    public function __construct()
    {
        $this->sid = config('services.twilio.sid');
        $this->auth_token = config('services.twilio.auth_token');
        $this->apiKey = config('services.twilio.api_key');
        $this->apiSecret = config('services.twilio.api_secret');
    }

    public function getToken(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'room' => 'required|max:255',
            'identity' => 'required|max:255',

        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $twilio = new Client($this->sid, $this->auth_token);

        $twilio->video->v1->rooms->create([
            "uniqueName" => $request->room,
        ]);

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
        $twilio = new Client($this->sid, $this->auth_token);

        $rooms = $twilio->video->v1->rooms
            ->read(["status" => "completed"]);

        foreach ($rooms as $record) {
            $name[] = $record->uniqueName;
            $id[] = $record->sid;
        }

        return response()->json([
            "sid" => $id,
            "roomName" => $name,
        ]);
    }
}
