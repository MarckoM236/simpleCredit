import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OpenIAService {

  URL:string = environment.openAIUrl;
  KEY:string = environment.openAIKey;

  constructor(private http: HttpClient) { }

  request(msg: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.KEY}`
    });

    const body = {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: msg }],
    };

    return this.http.post(this.URL, body, { headers: headers });
  }
}
