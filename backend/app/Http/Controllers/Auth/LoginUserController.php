<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginUserController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->validate([
           
            'email' => [
                'required',
                'email',
                'max:255',

            ],
            'password' => [
                'required',
                'string',
                'min:8',
                'max:32',
                'regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/',

            ],
        ]);

          try{

              
              if (Auth::attempt($credentials)) {
                  $user = $request->user();
                  $token = $user->createToken('carrer-lifter');
                  
                  return response()->json([
                      'success' => true,
                      'user'=>[
                          'id'=>$user->id,
                          'username'=>$user->username,
                          'email'=>$user->email,
                          'role'=>$user->role,
                          'created_at'=>$user->created_at,
                          'updated_at'=>$user->updated_at,
                        ],
                    'token'=>$token->plainTextToken,

                ]);

            }
            
            return response()->json([
                'success' => false,
                'message' => "Incorrect email and password",
            ], 401);
           
        }

        catch(\Exception $e){
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 500);
        }

       
    }
}
