import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {

  name:string="";
  email:string="";
  password:string="";

  alert:string[]=[];

  constructor(private api: ApiService){}

  RegisterClient() {
    this.alert=[];

    const datos = {
      "name":this.name,
      "email":this.email,
      "password":this.password
  };  

    this.api.register(datos).subscribe((response: any) => {
      if(response.data){
        alert('usuario '+response.data.name+' registrado exitosamente');
      }
      else{
        for (const key in response) {
          if (response.hasOwnProperty(key)) {
            this.alert.push(response[key]);
          }
        }
      }
    });
  }

  clear(){
    this.email = "";
    this.name = "";
    this.password = "";
  }

}
