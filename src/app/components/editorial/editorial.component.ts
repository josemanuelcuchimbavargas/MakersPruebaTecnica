import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EditorialService } from './editorial.service';

@Component({
  selector: 'app-editorial',
  templateUrl: './editorial.component.html',
  styleUrls: ['./editorial.component.css']
})
export class EditorialComponent implements OnInit {

  EditorialForm: FormGroup;
  dataEditorial: any = [];
  constructor(
    private formBuilder: FormBuilder,
    private _EditorialService: EditorialService) { }

  ngOnInit(): void {
      this.EditorialForm = this.formBuilder.group({
          Nombre: ['', Validators.required],              
          IdEditorial: [null],              
      });

      this.obtenerDatos();
  }

  obtenerDatos() {
    this._EditorialService.getAll().subscribe((res: any) => {
      if (res.length > 0) {
        this.dataEditorial = res;        
      }else{
        this.dataEditorial = [];
      }
    });
  }

  limpiar() {
    this.EditorialForm.reset();
  }

  guardar(){   
    let json = {
      Nombre : this.EditorialForm.controls["Nombre"].value,
      IdEditoria :this.EditorialForm.controls["IdEditorial"].value
    };
    if(json.IdEditoria == null){
      this._EditorialService.save(json).subscribe(((res:any)=>{
          if(typeof res.idEditoria != "undefined"){
            this.limpiar();
            this.obtenerDatos();
          }
      }));
    }  else {
      this._EditorialService.put(json).subscribe(((res:any)=>{
        if(res.status == true){
            this.limpiar();
            this.obtenerDatos();
        }
    }));
    }
  }

  editar(data){    
      this.EditorialForm.controls["Nombre"].setValue(data.nombre);
      this.EditorialForm.controls["IdEditorial"].setValue(data.idEditoria);
  }

  eliminar(id){  
    if(id !== null){
      this._EditorialService.delete(id).subscribe(((res: any)=>{
          if(typeof res.idEditoria != "undefined"){
            this.limpiar();
            this.obtenerDatos();
          }
      }));
    }   
  }

}
