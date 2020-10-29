import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CONFIG } from '../../config';
 

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor( public http: HttpClient) { }

  login(username, pass): Observable<any>{
      let json = JSON.stringify({Usuario:username, Password: pass});
      let headers = new HttpHeaders().set('Content-Type','application/json');
      return this.http.post(CONFIG.urlBase + "login",json, {headers: headers});   
  }

}
