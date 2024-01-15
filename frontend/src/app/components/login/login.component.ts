import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { UserInfoService } from 'src/app/services/user-info.service';
import { RefreshService } from 'src/app/services/refresh.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email:string = "";
  password:string = "";

  error_status:boolean=false;
  error_msg:string = ""

  constructor(private _api : ApiService, private router:Router, private _user:UserInfoService,private _refresh:RefreshService){}

  ngOnInit():void{
    this._refresh.emitEvent(false);
    this.token_validate();
  }

  token_validate(){
    if(localStorage.getItem('token')){
      this.router.navigate(['dashboard']);
    }
  }

  login(){
    const data = {
      "email":this.email,
      "password":this.password
    }; 
    
    this._api.login(data).subscribe((response:any)=>{
      if(response.status){
        localStorage.setItem("token",response.access_token);
        this._user.setUserData(response.data);
        localStorage.setItem('login', 'true');
        this.router.navigate(["dashboard"]);
      }
    },
    (error) => {
      console.error('Error en la solicitud:', error);

      if (error && error.status === 401) {
        if (error && error.error && error.error.message) {
          this.error_status=true;
          this.error_msg=error.error.message;
        }
      }
    })

  }

}
