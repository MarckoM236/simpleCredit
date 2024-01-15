<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Credit;

class CreditController extends Controller
{
    public function index($role,$user_id=""){
        $credits = Credit::join('users as client','client.id','credit.client_id')
        ->join('users as approver','approver.id','credit.approver_id')
        ->join('credit_type','credit_type.id','credit.credit_type_id');

        if($role == "Client" ){
            if(!empty($user_id)){
                $credits->where('credit.client_id',$user_id);
            }
            else{
                return response()->json(["status"=>false,"message"=> "No hay creditos aprovados disponibles"], 200);
            }
        }

        if($role == "Adviser"){
            if(!empty($user_id)){
                $credits->where('credit.approver_id',$user_id);
            }
            else{
                return response()->json(["status"=>false,"message"=> "No hay creditos aprovados disponibles"], 200);
            }
        }

        $credits->select('credit.*','approver.name as name_approver','client.name as name_client','credit_type.description_type as credit_name','credit_type.percentage_type as credit_percentage');
        $credits=$credits->get();

        return response()->json(["status"=>true,"data"=>$credits],200);

    }
    
    public function store($data){
        try {
            Credit::create($data);
            return response()->json(['status'=>true,'message' => 'Credito generado'], 201);
        } catch (\Throwable $th) {
            return response()->json(['status'=>false,'message' => 'Error al generar el credito','error_details' => $th->getMessage()], 500);
        }
    }

}
