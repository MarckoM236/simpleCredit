import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  URL:string = environment.apiUrl;
  token:any = localStorage.getItem('token');

  constructor(private http:HttpClient) { }

  //new client
  register(data:any):Observable<any>{
    let dir:string = this.URL+"register";
    return this.http.post(dir, data);
  }
//--------------------------------------------------

  //session
  login(data:any):Observable<any>{
    let dir:string = this.URL+"login";
    return this.http.post(dir, data);
  }

  logout():Observable<any>{
    let dir:string = this.URL+"logout";

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    return this.http.get(dir,{ headers });
  }
//--------------------------------------------------

  //CRUD users
  create(data:any):Observable<any>{
    let dir:string = this.URL+"users";

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    return this.http.post(dir, data,{ headers });
  }

  list(role:string):Observable<any>{
    let dir:string = this.URL+"users/"+role;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    return this.http.get(dir,{ headers });
  }

  delete(id:number):Observable<any>{
    let dir:string = this.URL+"users/"+id;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    return this.http.delete(dir,{ headers });
  }

  show(id:number):Observable<any>{
    let dir:string = this.URL+"users-show/"+id;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    return this.http.get(dir,{ headers });
  }

  update(id:number,data:any):Observable<any>{
    let dir:string = this.URL+"users/"+id;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    return this.http.put(dir, data,{ headers });
  }
//--------------------------------------------------

  //application credit
  applicationCreate(data:any):Observable<any>{
    let dir:string = this.URL+"application";

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    return this.http.post(dir, data,{ headers });
  }

  applicationList(role:string, user_id:number):Observable<any>{
    let dir:string = this.URL+"application-role/"+role+"/"+user_id;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    return this.http.get(dir, { headers });
  }

  applicationUpdate(data:any,id:number):Observable<any>{
    let dir:string = this.URL+"application/"+id;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    return this.http.put(dir, data,{ headers });
  }
//--------------------------------------------------  

  //credits
  creditList(role:string, user_id:number):Observable<any>{
    let dir:string = this.URL+"credit-role/"+role+"/"+user_id;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    return this.http.get(dir, { headers });
  }
  
}
