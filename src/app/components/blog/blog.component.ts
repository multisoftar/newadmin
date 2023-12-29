import { AfterViewInit, Component } from '@angular/core';
import { virtualRouter } from './../../services/virtualRouter.service'; // Asegúrate de que la ruta sea correcta
import { GlobalService } from './../../services/global.service'; // Asegúrate de que la ruta sea correcta
import { ScriptService } from './../../services/script.service';
import { ScriptStore } from './../../services/script.store';
import { HttpClient } from '@angular/common/http';
import { UploaderCaptions } from 'ngx-awesome-uploader';
import { DemoFilePickerAdapter } from '../file-picker.adapter';
import { DataApiService } from './../../services/data-api-service';
import { Butler } from './../../services/butler.service';
import { Yeoman } from './../../services/yeoman.service';
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements AfterViewInit {
  editing=false;
  testimony:any;
  public captions: UploaderCaptions = {
    dropzone: {
      title: 'Imágenes del ',
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
    price: null,
    stock: 0,
    ref: '',
    idBranch: '',
    detail: '',
    company:''
  };
 
  adapter = new  DemoFilePickerAdapter(this.http,this._butler);
    constructor(
      public http: HttpClient,
      public script: ScriptService,
      public virtualRouter: virtualRouter,
      public global: GlobalService,
      public _butler:Butler,     
      public dataApiService:DataApiService,
      public yeoman:Yeoman
      ) {
  
      }
      cancelarUpdate(){
        this.editing=false;
      }
    edit(){
      this.editing=true;
    }
    newPost(){
      this.virtualRouter.routerActive="addpost";
    }
      preview(client:any){
        this.global.clientSelected=client;
        this.global.clientPreview=true;
      }
      onSubmit() {
        this.data.ref = (Math.floor(Math.random() * 10000000000000)).toString();
        this.data.images=this._butler.uploaderImages;
        this.dataApiService.saveTestimony(this.data).subscribe(response=>{
          console.log(response);
          this._butler.uploaderImages=[];
        });
        console.log(this.data);
        
        }
  ngAfterViewInit(): void {
}
  }
  