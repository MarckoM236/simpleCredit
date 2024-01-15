<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use PhpParser\Node\Stmt\TryCatch;

class UserController extends Controller
{
    public function index($role=""){
        $users = User::with('roles');
        if($role == "GeneralManager"){
            $users->whereHas('roles', function ($query) {
                $query->where('name', 'Adviser');
            });
        }
        $users = $users->get();
        $response = [];

        foreach ($users as $user) {
            $response[] = [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->roles->pluck('name')->implode(', '), 
                'creation' =>$user->created_at
            ];
        }
        return response()->json(['status'=>true,'data'=>$response], 200);
    }
    
    public function store(Request $request){
        try {
            $validator = Validator::make($request->all(),[
                'name' => 'required|string',
                'email' => 'required|email|unique:users,email',
                'password' => 'required|string|min:6',
                'roles' => 'required'
            ]);

            if($validator->fails()){
                return response()->json(["status"=>false,"errors"=>$validator->errors()]);
            }
    
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => bcrypt($request->password)
            ]);
    
            // Asignar roles al usuario
            $user->assignRole($request->roles);
    
            return response()->json(['status'=>true,'message' => 'Usuario creado con éxito'], 201);
        } catch (\Throwable $th) {
            return response()->json(['status'=>false,'message' => 'Error al intentar crear el usuario'], 500);
        }
    }

    public function show($id){
        $users = User::with('roles')->where('users.id',$id)->get();
        $response = [];

        foreach ($users as $user) {
            $response[] = [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->roles->pluck('name')->implode(', '), 
            ];
        }
        return response()->json(['status'=>true,'data'=>$response], 200);
    }

    public function update(Request $request,$id){
        try {
            $validator = Validator::make($request->all(),[
                'name' => 'required|string',
                'email' => 'required|email',
                'roles' => 'required'
            ]);

            if($validator->fails()){
                return response()->json(["status"=>false,"errors"=>$validator->errors()]);
            }
            $user = User::find($id);
    
            if (!$user) {
                return response()->json(['message' => 'No se encontro el usuario solicitado'], 404);
            }
    
                $user->name = $request->name;
                $user->email = $request->email;
                if($request->password != ""){
                    $user->password = $request->password;
                }

                $user->update();

                $user->syncRoles([$request->roles]);
                
                return response()->json(['status'=>true,'message' => 'Usuario actualizado con éxito'], 201);
        } catch (\Throwable $th) {
            return response()->json(['status'=>false,'message' => 'Error al intentar actualizar el usuario'], 500);
        }
    }

    public function destroy($id){
        try {
            $user = User::find($id);
    
            if (!$user) {
                return response()->json(['status'=>false,'message' => 'No se encontro el usuario'], 404);
            }

            $user->delete();
            return response()->json(['status'=>true,'message' => 'Usuario eliminado con éxito'], 201);
        } catch (\Throwable $th) {
            return response()->json(['status'=>false,'message' => 'Error al intentar eliminar el usuario'], 500);
        }
    }
}
