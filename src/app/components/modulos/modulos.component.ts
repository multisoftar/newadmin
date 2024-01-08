import { Component, OnInit } from '@angular/core';
import { virtualRouter } from './../../services/virtualRouter.service';
import { GlobalService } from './../../services/global.service';
import { ScriptService } from './../../services/script.service';
import { UploaderCaptions } from 'ngx-awesome-uploader';
import { DemoFilePickerAdapter } from './../file-picker.adapter';
import { Butler } from './../../services/butler.service';
import { HttpClient } from '@angular/common/http';
import { DataApiService } from './../../services/data-api-service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-modulos',
  templateUrl: './modulos.component.html',
  styleUrl: './modulos.component.css'
})
export class ModulosComponent implements OnInit {
  editing = false;
  public captions: UploaderCaptions = {
    dropzone: {
      title: 'Imágenes del módulo',
      or: '.',
      browse: 'Cargar',
    },
    cropper: {
      crop: 'Cortar',
      cancel: 'Cancelar',
    },
    previewCard: {
      remove: 'Borrar',
      uploadError: 'error',
    },
  };
  data = {
    images: [] as string[], // o cualquier otro tipo de dato adecuado, como any[]
    name: '',
    description: '',
    ref: '',
    referencia: '',
    idCategory: '',
    categories: [] as Array<{ name: string, id: number }>
  };
  adapter = new DemoFilePickerAdapter(this.http, this._butler);
  constructor(
    public script: ScriptService,
    public virtualRouter: virtualRouter,
    public global: GlobalService,
    public _butler: Butler,
    public dataApiService: DataApiService,
    public http: HttpClient,
  ) {
  }
  simpleAlert(){

    Swal.fire('Hello world!');

  }
  preview(modulo: any) {
    this.global.moduloSelected = modulo;
    this.global.moduloPreview = true;
  }
  edit() {
    this.editing = true;
  }
  cancelarUpdate() {
    this.editing = false;
    this._butler.uploaderImages = [];
  }
  beforeDelete(i:any){
    Swal.fire({

      title: 'Seguro deseas borrar este módulo?',

      text: 'esta acción de se podrá revertir!',

      icon: 'warning',

      showCancelButton: true,

      confirmButtonText: 'Sí, bórralo!',

      cancelButtonText: 'No, mejor no'

    }).then((result) => {

      if (result.value) {
        this.deleteModule(i)
        Swal.fire(

          'Borrado!',

          'El módulo ha sido borrado.',

          'success'

        )

      } else if (result.dismiss === Swal.DismissReason.cancel) {

        Swal.fire(

          'Cancelado',

          '',

          'error'

        )

      }

    })
  }
  deleteModule(i:any){
    this.global.deleteModule(i).subscribe(response =>{
      this.global.loadModulos();
      Swal.fire('Módulo borrado');
    });
  }
  onSubmit() {
    this.data.ref = (Math.floor(Math.random() * 10000000000000)).toString();
    this.data.images = this._butler.uploaderImages;
    this.dataApiService.saveModules(this.data).subscribe(response => {
      console.log(response);
      this._butler.uploaderImages = [];
      this.data.images = [];
      Swal.fire('Bien...', 'El módulo ha sido agregado satisfactoriamente!', 'success');
      this.data=  {
        images: [] as string[], // o cualquier otro tipo de dato adecuado, como any[]
        name: '',
        description: '',
        ref: '',
        referencia: '',
        idCategory: '',
        categories: [] as Array<{ name: string, id: number }>
        
      };
      this.global.loadModulos();
      this.editing=false;
     
    });
    console.log(this.data);
  }
  ngOnInit() {
    this.global.showDescriptionArray = new Array(this.global.modulos.length).fill(false);
  }
}
