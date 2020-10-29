import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CONFIG } from '../../config';
 

@Injectable({
  providedIn: 'root'
})
export class EditorialService {

  constructor( public http: HttpClient) { }

  save(editorial): Observable<any> {
    let json = JSON.stringify({    
      Nombre: editorial.Nombre     
    });   
    let user = JSON.parse(localStorage.getItem('user'));
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${user.token}`
    });     
    return this.http.post(CONFIG.urlBase + 'editorials' , json, { headers: headers });
  }

  getAll(){            
      let user = JSON.parse(localStorage.getItem('user'));
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      });           
      return this.http.get(CONFIG.urlBase + 'editorials', {headers: headers});
  }


  put(editorial){
     let json = JSON.stringify({         
        IdEditoria: editorial.IdEditoria,
        Nombre: editorial.Nombre
     });
     let user = JSON.parse(localStorage.getItem('user'));
     let headers = new HttpHeaders({
       'Content-Type': 'application/json',
       'Authorization': `Bearer ${user.token}`
     });     
     return this.http.put(CONFIG.urlBase+ 'editorials/' + editorial.IdEditoria,json,{headers:headers});
  }

  delete(id){    
    let user = JSON.parse(localStorage.getItem('user'));
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${user.token}`
    });      
     return this.http.delete(CONFIG.urlBase+ 'editorials/'+id, {headers: headers});
  }

}