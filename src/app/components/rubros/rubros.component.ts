import { Component } from '@angular/core';
import { virtualRouter } from './../../services/virtualRouter.service'; 
import { GlobalService } from './../../services/global.service'; 
import { ScriptService } from './../../services/script.service';
import { ScriptStore } from './../../services/script.store';
import { UploaderCaptions } from 'ngx-awesome-uploader';
import { DemoFilePickerAdapter } from './../file-picker.adapter';
import { Butler } from './../../services/butler.service';
import { HttpClient } from '@angular/common/http';
import { DataApiService } from './../../services/data-api-service';
@Component({
  selector: 'app-rubros',
  templateUrl: './rubros.component.html',
  styleUrl: './rubros.component.css'
})
export class RubrosComponent {
  editing=false;
  data = {
    images: [] as string[], 
    name: '',
    ref: ''
  };

  adapter = new DemoFilePickerAdapter(this.http, this._butler);
  
  constructor(
    public script: ScriptService,
    public virtualRouter: virtualRouter,
    public global: GlobalService,
    public _butler: Butler,
    public dataApiService: DataApiService,
    public http: HttpClient
    ) {
    }
    preview(rubro:any){
      this.global.rubroSelected=rubro;
      this.global.rubroPreview=true;
    }
    edit(){
      this.editing=true;
    }
    cancelarUpdate() {
      this.editing = false;
    }
    onSubmit() {
      this.data.ref = (Math.floor(Math.random() * 10000000000000)).toString();
      this.data.images = this._butler.uploaderImages;
      this.dataApiService.saveCategory(this.data).subscribe(response => {
        console.log(response);
        this._butler.uploaderImages = [];
      });
      console.log(this.data);
    }
    ngAfterViewInit(): void {
  
    }
}
