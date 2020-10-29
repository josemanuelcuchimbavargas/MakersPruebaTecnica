import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CONFIG } from '../../config';
 

@Injectable({
  providedIn: 'root'
})
export class LibroService {

  constructor( public http: HttpClient) { }

  save(libro): Observable<any> {
    let json = JSON.stringify({    
      Titulo: libro.Titulo,
      IdEditoria: libro.IdEditoria,
      Fecha: libro.Fecha,
      Costo: libro.Costo,
      PrecioSugerido: libro.PrecioSugerido, 
      Autor: libro.Autor
    });   
    let user = JSON.parse(localStorage.getItem('user'));
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${user.token}`
    });     
    return this.http.post(CONFIG.urlBase + 'libros' , json, { headers: headers });
  }

  getAll(){            
      let user = JSON.parse(localStorage.getItem('user'));
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      });           
      return this.http.get(CONFIG.urlBase + 'libros', {headers: headers});
  }


  put(libro){
     let json = JSON.stringify({  
        IdLibro: libro.IdLibro,
        Titulo: libro.Titulo,
        IdEditoria: libro.IdEditoria,
        Fecha: libro.Fecha,
        Costo: libro.Costo,
        PrecioSugerido: libro.PrecioSugerido, 
        Autor: libro.Autor
     });
     let user = JSON.parse(localStorage.getItem('user'));
     let headers = new HttpHeaders({
       'Content-Type': 'application/json',
       'Authorization': `Bearer ${user.token}`
     });     
     return this.http.put(CONFIG.urlBase+ 'libros/' + libro.IdLibro,json,{headers:headers});
  }

  delete(id){    
    let user = JSON.parse(localStorage.getItem('user'));
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${user.token}`
    });      
     return this.http.delete(CONFIG.urlBase+ 'libros/'+id, {headers: headers});
  }

}