<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\CreditApplication;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Helpers\createAccountNumber;
use App\Models\Credit_type;

use function App\Helpers\createAccountNumber;

class CreditApplicationController extends Controller
{

    public function showByRole($role,$user_id=""){
        $applications = CreditApplication::join('users','users.id','credit_applications.user_id');

        if($role == "Client" ){
            if(!empty($user_id)){
                $applications->where('credit_applications.user_id',$user_id);
            }
            else{
                return response()->json(["status"=>false,"message"=> "No hay solicitud de creditos disponibles"], 200);
            }
        }

        if($role == "Adviser"){
            $applications->where('credit_applications.status','filed');
        }

        if($role == "GeneralManager"){
            $applications->where('credit_applications.status','pending_approval');
        }

        $applications->select('credit_applications.*','users.name as user_name');
        $applications=$applications->get();

        return response()->json(["status"=>true,"data"=>$applications],200);

    }


    public function store(Request $request){
        try {
            $request->validate([
                'user_id' => 'required',
                'credit_value' => 'required',
                'dues' => 'required',
                'credit_type_id' => 'required',
            ]);
    
                CreditApplication::create([
                'user_id' => $request->user_id,
                'credit_value' => $request->credit_value,
                'dues' => $request->dues,
                'description' => $request->description,
                'credit_type_id' => $request->credit_type_id
            ]);
    
            return response()->json(['status'=>true,'message' => 'Solicitud radicada con exito'], 201);

        } catch (\Throwable $th) {
            return response()->json(['status'=>false,'message' => 'Error al procesar la solicitud'], 500);
        }
    }

    public function show($id){
        $applications = CreditApplication::leftjoin('users','users.id','credit_applications.user_id')
                        ->where('credit_applications.id',$id)
                        ->select('credit_applications.*','users.name as user_name')
                        ->get();

        if($applications->isEmpty()) {
            return response()->json(["message"=> "No existe el crtedito"], 404);
        } 

        return response()->json(["data"=>$applications], 200);
    }

    public function update(Request $request,$id){
        
            try {
                $request->validate([
                    'status' => 'required'
                ]);
        
                $application = CreditApplication::find($id);
        
                if (!$application) {
                    return response()->json(['status'=>false,'message' => 'No se encontro la solicitud de credito'], 404);
                }
        
                    $application->status = $request->status;
                    $application->advisor_observations = $request->advisor_observations;
        
                    if($application->save()){
                        if($application->status=="approved"){

                            $account_number= createAccountNumber();
                            $approver=auth()->id();

                            $credit_type_percentage= Credit_type::where('id',$application->credit_type_id)->value('percentage_type');
                            $due_value = (($application->credit_value/$application->dues) + ($application->credit_value * $credit_type_percentage));

                            $data = ['account_number'=> $account_number,'credit_value'=>$application->credit_value,'dues'=>$application->dues,'due_value'=>$due_value,
                                'client_id'=>$application->user_id,'approval_date'=>Carbon::now()->toDateString(),'approver_id'=>$approver,'credit_type_id'=>$application->credit_type_id];
    
                            $credit = new CreditController();
                            return $result = $credit->store($data);
                        }
                        
                        return response()->json(['status'=>true,'message' => 'Solicitud actualizada con exito'], 200);
                    }    
            } catch (\Throwable $th) {
                return response()->json(['status'=>false,'message' => 'Error al procesar la solicitud'], 500);
            }
    }
    
}
