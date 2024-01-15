<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request){
        $validator = Validator::make($request->all(),[
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6'
        ]);

        if($validator->fails()){
            return response()->json($validator->errors());
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);

        $user->assignRole('Client');

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json(["data"=>$user,"access_token"=>$token,"token_type"=>"Bearer"],201);
    }

    public function login(Request $request){
        
        $credentials = [
            'email' => $request->input('email'),
            'password' => $request->input('password'),
        ];
        
        if (Auth::attempt($credentials)) {

            $user = User::where('email',$request->input('email'))->firstOrFail();
            $token = $user->createToken('auth_token')->plainTextToken;
            
        if ($user->roles->isNotEmpty()) {
            $role = $user->roles->first();
        }

            return response()->json(["status"=>true,"data"=>$user,"access_token"=>$token,"token_type"=>"Bearer"],200);
        } else {
            return response()->json(["status"=>false,'message' => 'Incorrect username or password'], 401);
        }
    }

    public function logout(){

        Auth::user()->tokens()->delete();

        return response()->json(["status"=>true,"message"=>"successful logout"],200);
    }
}
