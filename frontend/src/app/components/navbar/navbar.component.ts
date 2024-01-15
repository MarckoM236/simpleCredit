import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { UserInfoService } from 'src/app/services/user-info.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  name:string="";
  show:boolean = false;
  account:boolean=true;
  role:string=this._user.getUserData() !==null ? this._user.getUserData().roles[0].name : "";

  constructor(private router:Router,private _user:UserInfoService,private _api:ApiService){
    
  }

  ngOnInit():void{
    this.sesion_validate();
  }

  sesion_validate(){
    if(!localStorage.getItem('login')){
      this.show=true;
      this.account=false;
    }
    else{
      this.showUserInfo();
    }
  }

  showUserInfo(){
    this.name = this._user.getUserData().name;
  }

  logout(): void {
    this._api.logout().subscribe((response:any)=>{
      if(response.status){
        localStorage.clear();
        this.router.navigate(['login']);
      }
    })
    
  }

}
