import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { RefreshService } from 'src/app/services/refresh.service';
import { UserInfoService } from 'src/app/services/user-info.service';

@Component({
  selector: 'app-credit-application',
  templateUrl: './credit-application.component.html',
  styleUrls: ['./credit-application.component.css']
})
export class CreditApplicationComponent {
  user_id:any;
  credit_value:string="";
  dues:string="";
  due_value:string="";
  credit_type:string="";
  description:string="";
  role:string=this._user.getUserData().roles[0].name;

  applications:any[]=[];

  alert:any[]=[];
  success:string="";

  status_alert:any[]=[];
  status_success:string="";

  constructor(private _user:UserInfoService, private _api:ApiService,private _refresh:RefreshService){}

  ngOnInit():void{
    this._refresh.emitEvent(true);
    this.listApplicationCredit();
  }

  applicationCredit(){
    this.alert = [];
    this.success = "";
    this.status_alert=[];
    this.status_success="";
    
    this.user_id = this._user.getUserData().id;
    const data={
      "user_id":this.user_id,
      "credit_value":this.credit_value,
      "dues":this.dues,
      "credit_type_id":this.credit_type,
      "description":this.description
    }

    this._api.applicationCreate(data).subscribe((response:any)=>{
      if(response.status){
        this.clear();
        this.listApplicationCredit();
        this.success=response.message;
      }
    },
    (error) => {
      console.error('Error en la solicitud:', error);

      if (error && error.status === 500) {
        if (error && error.error && error.error.message) {
          this.alert.push(error.error.message);
        }
      }
    })

  }

  listApplicationCredit(){
    if(this.role === "Client"){
      this.user_id = this._user.getUserData().id;
    }
    else{
      this.user_id="";
    }

    this._api.applicationList(this.role,this.user_id).subscribe((response:any)=>{
      if(response.status){
        this.applications = response.data;
      }
    })
  }

  status(res:string,id:number){
    this.alert = [];
    this.success = "";
    this.status_alert = [];
    this.status_success = "";
    
    if(this.role==="Client"){
      if(res==="rejected"){
        res="cancelled";
      }
    }

    if(this.role==="Adviser"){
      if(res==="approved"){
        res="pending_approval";
      }
    }

    const data = {
      "status":res
    }

    this._api.applicationUpdate(data,id).subscribe((response:any)=>{
      if(response.status){
        this.listApplicationCredit();
        this.status_success=response.message;
      }
    },
    (error) => {
      console.error('Error en la solicitud:', error);

        if (error && error.error && error.error.message) {
          this.status_alert.push(error.error.message);
        }
    })
  }

  clear(){
    this.user_id = "";
    this.credit_value = "";
    this.dues = "";
    this.credit_type = "";
    this.description = "";
  }

}
