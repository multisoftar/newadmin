import { Component, OnInit } from '@angular/core';
import { virtualRouter } from './../../services/virtualRouter.service';
import { GlobalService } from './../../services/global.service';
import { ScriptService } from './../../services/script.service';
import { UploaderCaptions } from 'ngx-awesome-uploader';
import { DemoFilePickerAdapter } from './../file-picker.adapter';
import { Butler } from './../../services/butler.service';
import { HttpClient } from '@angular/common/http';
import { DataApiService } from './../../services/data-api-service';
@Component({
  selector: 'app-modulos',
  templateUrl: './modulos.component.html',
  styleUrl: './modulos.component.css'
})
export class ModulosComponent implements OnInit {
  editing = false;
  public captions: UploaderCaptions = {
    dropzone: {
      title: 'Imágenes de la solucion',
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
  preview(modulo: any) {
    this.global.moduloSelected = modulo;
    this.global.moduloPreview = true;
  }
  edit() {
    this.editing = true;
  }
  cancelarUpdate() {
    this.editing = false;
  }
  onSubmit() {
    this.data.ref = (Math.floor(Math.random() * 10000000000000)).toString();
    this.data.images = this._butler.uploaderImages;
    this.dataApiService.saveModules(this.data).subscribe(response => {
      console.log(response);
      this._butler.uploaderImages = [];
    });
    console.log(this.data);
  }
  ngOnInit() {
    this.global.showDescriptionArray = new Array(this.global.modulos.length).fill(false);
  }
}
