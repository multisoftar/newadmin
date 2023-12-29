import { AfterViewInit, Component } from '@angular/core';
import { virtualRouter } from './../../services/virtualRouter.service'; 
import { GlobalService } from './../../services/global.service'; 
import { ScriptService } from './../../services/script.service';
import { UploaderCaptions } from 'ngx-awesome-uploader';
import { DemoFilePickerAdapter } from './../file-picker.adapter';
import { Butler } from './../../services/butler.service';
import { HttpClient } from '@angular/common/http';
import { DataApiService } from './../../services/data-api-service';
import { Yeoman } from '@app/services/yeoman.service';
@Component({
  selector: 'app-soluciones',
  templateUrl: './soluciones.component.html',
  styleUrl: './soluciones.component.css'
})
export class SolucionesComponent implements AfterViewInit {
  editing = false;
  soluciones: any;
  category = 'Seleccione una';
  categorySeted: boolean = false;
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
    idCategory: ''
  };

  adapter = new DemoFilePickerAdapter(this.http, this._butler);
  constructor(
    public http: HttpClient,
    public script: ScriptService,
    public virtualRouter: virtualRouter,
    public global: GlobalService,
    public _butler: Butler,
    public dataApiService: DataApiService,
    public yeoman: Yeoman
  ) {
  }
  cancelarUpdate() {
    this.editing = false;
  }
  edit() {
    this.editing = true;
  }
  preview(client: any) {
    this.global.clientSelected = client;
    this.global.clientPreview = true;
  }
  onSubmit() {
    this.data.ref = (Math.floor(Math.random() * 10000000000000)).toString();
    this.data.images = this._butler.uploaderImages;
    this.dataApiService.saveProduct(this.data).subscribe(response => {
      console.log(response);
      this._butler.uploaderImages = [];
    });
    console.log(this.data);
  }
  getAllCategories() {
    this.dataApiService.getAllCategory().subscribe(response => {
      this.yeoman.categories = response;
      this.yeoman.allcategory = response;
      this.yeoman.allCategoriesSize = this.yeoman.categories.length;
    });
  }

  onCategorySelect(category: any) {
    this.data.idCategory = "c" + category.id;
    console.log(category.id);
  }

  setCategory(category: any) {
    let index = category;
    console.log("seleccionada: " + this.yeoman.allcategory[index].name);
    this.categorySeted = true;
    if (this.yeoman.categories !== undefined) {
      this.data.idCategory = this.yeoman.allcategory[index].id;
      console.log("id: " + JSON.stringify(this.data.idCategory));
    }
  }
  ngAfterViewInit(): void {
  }
}
