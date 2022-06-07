<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Twilio\Jwt\AccessToken;
use Twilio\Jwt\Grants\VideoGrant;

class RoomController extends Controller
{
    private $sid, $apiKey, $apiSecret;

    public function __construct()
    {
        $this->sid = config('services.twilio.sid');
        $this->apiKey = config('services.twilio.api_key');
        $this->apiSecret = config('services.twilio.api_secret');
    }

    public function getToken(Request $request)
    {
        $request->validate([
            'roomName' => 'required|max:255',
        ]);

        $identity = uniqid();
        $token = new AccessToken(
            $this->sid,
            $this->apiKey,
            $this->apiSecret,
            3600,
            $identity
        );

        $grant = new VideoGrant();
        $grant->setRoom($request->roomName);
        $token->addGrant($grant);

        return $token->toJWT();
    }
}
