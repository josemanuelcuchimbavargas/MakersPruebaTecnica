import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EditorialService } from '../editorial/editorial.service';
import { LibroService } from './libro.service';

@Component({
  selector: 'app-libro',
  templateUrl: './libro.component.html',
  styleUrls: ['./libro.component.css']
})
export class LibroComponent implements OnInit {

  EditorialForm: FormGroup;
  dataLibro: any = [];
  editorial: any = [];
  constructor(
    private formBuilder: FormBuilder,
    private _EditorialService: EditorialService,
    private _LibroService: LibroService) { }

  ngOnInit(): void {
      this.EditorialForm = this.formBuilder.group({
          Titulo: ['', Validators.required],              
          Fecha: ['', Validators.required],              
          Costo: ['', Validators.required],              
          PrecioSugerido: ['', Validators.required],              
          Autor: ['', Validators.required],              
          idEditoria: [null],             
          idLibro: [null]             
      });
      this.obtenerDatos();
      this.obtenerDatosEditorial();
  }

  obtenerDatos() {
    this._LibroService.getAll().subscribe((res: any) => {
      if (res.length > 0) {
        this.dataLibro = res;        
      }else{
        this.dataLibro = [];
      }
    });
  }

  obtenerDatosEditorial() {
    this._EditorialService.getAll().subscribe((res: any) => {
      if (res.length > 0) {
        this.editorial = res;        
      }else{
        this.editorial = [];
      }
    });
  }


  limpiar() {
    this.EditorialForm.reset();
  }

  guardar(){   
    let json = {
      IdLibro : this.EditorialForm.controls["idLibro"].value,
      Titulo : this.EditorialForm.controls["Titulo"].value,
      Fecha : this.EditorialForm.controls["Fecha"].value,
      Costo : this.EditorialForm.controls["Costo"].value,
      PrecioSugerido : this.EditorialForm.controls["PrecioSugerido"].value,
      Autor : this.EditorialForm.controls["Autor"].value,
      IdEditoria :this.EditorialForm.controls["idEditoria"].value
    };
    if(json.IdLibro == null){
      this._LibroService.save(json).subscribe(((res:any)=>{
          if(typeof res.idLibro != "undefined"){
            this.limpiar();
            this.obtenerDatos();
          }
      }));
    }  else {
      this._LibroService.put(json).subscribe(((res:any)=>{
        if(res.status == true){
            this.limpiar();
            this.obtenerDatos();
        }
    }));
    }
  }

  editar(data){      
    
      var transformarDate = new Date(data.fecha);
      var dia = "";
      if(transformarDate.getDate() <= 9){
         dia = "0"+transformarDate.getDate();
      }
      var dateTransformada = transformarDate.getFullYear()+"-"+(transformarDate.getMonth()+1)+"-"+dia;
      this.EditorialForm.controls["Titulo"].setValue(data.titulo);
      this.EditorialForm.controls["idLibro"].setValue(data.id);
      this.EditorialForm.controls["Fecha"].setValue(dateTransformada);
      this.EditorialForm.controls["Costo"].setValue(data.costo);
      this.EditorialForm.controls["PrecioSugerido"].setValue(data.precioSugerido);
      this.EditorialForm.controls["Autor"].setValue(data.autor);
      this.EditorialForm.controls["idEditoria"].setValue(data.idEditoria);  
  }


  eliminar(id){  
    if(id !== null){
      this._LibroService.delete(id).subscribe(((res: any)=>{
          if(typeof res.idEditoria != "undefined"){
            this.limpiar();
            this.obtenerDatos();
          }
      }));
    }   
  }
}
