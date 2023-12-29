import { Component } from '@angular/core';
import { virtualRouter } from './../../services/virtualRouter.service'; 
import { GlobalService } from './../../services/global.service'; 
import { ScriptService } from './../../services/script.service';

@Component({
  selector: 'app-integraciones',
  templateUrl: './integraciones.component.html',
  styleUrl: './integraciones.component.css'
})
export class IntegracionesComponent {
  editing=false;
  constructor(
    public script: ScriptService,
    public virtualRouter: virtualRouter,
    public global: GlobalService
    ) {
    }
    preview(integration:any){
      this.global.integrationSelected=integration;
      this.global.integrationPreview=true;
    }
    edit(){
      this.editing=true;
    }
}