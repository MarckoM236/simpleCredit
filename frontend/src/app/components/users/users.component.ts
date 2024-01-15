import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { RefreshService } from 'src/app/services/refresh.service';
import { UserInfoService } from 'src/app/services/user-info.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  id:number=0;
  name:string="";
  email:string="";
  password:string="";
  rol:string="";
  role:string=this._user.getUserData().roles[0].name;

  alert:any[]=[];
  success:string="";

  users:any[]=[];
  user_edit:any[]=[]

  constructor(private _api:ApiService,private _user:UserInfoService,private _refresh:RefreshService){}

  ngOnInit():void{
    this._refresh.emitEvent(true);
    this.listUsers();
  }

  listUsers(){
    this._api.list(this.role).subscribe((response:any)=>{
      if (response.status && response.data) {
        this.users = response.data;
      } 
    })
  }
 
  showUser(id:number){
    this.alert=[];
    this.success="";

    this._api.show(id).subscribe((response:any)=>{
      if (response.status && response.data) {
        this.user_edit = response.data;
        this.id= response.data[0].id;
        this.name=response.data[0].name;
        this.email=response.data[0].email;
        this.rol=response.data[0].role;
      } 
    })
  }

  deleteUser(id:number){
    this.alert=[];
    this.success="";

    this._api.delete(id).subscribe((response:any)=>{
      if(response.status){
        this.listUsers();
        this.success=response.message;
      }
      else{
        this.alert.push(response.message);
      }
    },
    (error) => {
      console.error('Error en la solicitud:', error);
        if (error && error.error && error.error.message) {
          this.alert.push(error.error.message);
        }  
    })
  }

  createUser(id:number=this.id){
    this.alert=[];
    this.success="";

    if(this.role==="GeneralManager"){
      this.rol = "Adviser";
    }

    const data:any={
      "name":this.name,
      "email":this.email,
      "password":this.password,
      "roles":this.rol
    }

    if(id > 0){
      console.log(id);
      this.updateUser(id,data);
      return;
    }

    this._api.create(data).subscribe((response: any) => {
      if(response.status){
        this.listUsers();
        this.success=response.message;
        this.clear();
      }
      else{
        if(response.status===false && response.errors){
          for (const key in response.errors) {
            if (response.errors.hasOwnProperty(key)) {
              this.alert.push(response.errors[key]);
            }
          }
        }
      }
    },
    (error) => {
      console.error('Error en la solicitud:', error);

      if (error && error.status === 500) {
        if (error && error.error && error.error.message) {
          this.alert.push(error.error.message);
        }
      }
    });
  }

  updateUser(id:number, data:any){
    this.alert=[];
    this.success="";
    this._api.update(id,data).subscribe((response: any) => {
      if(response.status){
        this.listUsers();
        this.success=response.message;
        this.clear();
      }
      else{
        if(response.status===false && response.errors){
          for (const key in response.errors) {
            if (response.errors.hasOwnProperty(key)) {
              this.alert.push(response.errors[key]);
            }
          }
        }
      }
    },
    (error) => {
      console.error('Error en la solicitud:', error);

        if (error && error.error && error.error.message) {
          this.alert.push(error.error.message);
        }
    });

  }

  clear(){
    this.id= 0;
    this.name="";
    this.email="";
    this.rol="";
    this.password="";

  }

}
