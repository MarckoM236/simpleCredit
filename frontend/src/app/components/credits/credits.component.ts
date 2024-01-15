import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { OpenIAService } from 'src/app/services/open-ia.service';
import { RefreshService } from 'src/app/services/refresh.service';
import { UserInfoService } from 'src/app/services/user-info.service';

@Component({
  selector: 'app-credits',
  templateUrl: './credits.component.html',
  styleUrls: ['./credits.component.css']
})
export class CreditsComponent {

  user_id:any;
  role:string=this._user.getUserData().roles[0].name;

  credits:any[]=[];
  credit_detail:any;
  show:boolean = false;

  msg_openIA:string="";

  constructor(private _api:ApiService, private _user:UserInfoService,private _refresh:RefreshService,private _openIA:OpenIAService){}

  ngOnInit():void{
    this._refresh.emitEvent(true);
    this.listCredits();
  }

  listCredits(){
    if(this.role === "Client"){
      this.user_id = this._user.getUserData().id;
    }
    else if(this.role === "Adviser"){
      this.user_id = this._user.getUserData().id;
    }
    else{
      this.user_id="";
    }

    this._api.creditList(this.role,this.user_id).subscribe((response:any)=>{
      if(response.status){
        this.credits = response.data;
      }
    })
  }

  creditDetail(i:number){
    this.credit_detail = this.credits[i];
    this.show=true;
    this._openIA.request('calcular cuota de credito, plazo en meses, la formula es ((valor de crédito /número de cuotas) + intereses), y los valores son valorCredito:'+this.credit_detail.credit_value +', numero de cuotas:'+ this.credit_detail.dues +', %interes:'+ this.credit_detail.credit_percentage).subscribe((response:any)=>{
      this.msg_openIA=response.choices[0].message.content;
    })
  }

}
