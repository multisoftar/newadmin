import { Component, ViewChild, ElementRef, AfterViewInit, OnInit, Inject } from '@angular/core';
import Quill from 'quill'
import { virtualRouter } from './services/virtualRouter.service'; // Asegúrate de que la ruta sea correcta
import { GlobalService } from './services/global.service'; // Asegúrate de que la ruta sea correcta
import { ScriptService } from './services/script.service';
import { ScriptStore } from './services/script.store';
const parchment = Quill.import('parchment')
const block = parchment.query('block')
block.tagName = 'DIV'
// or class NewBlock extends Block {} NewBlock.tagName = 'DIV'
Quill.register(block /* or NewBlock */, true)

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html',

})
export class AppComponent implements  OnInit{
  percentage: any = ElementRef;

  showContent: boolean = false;
  title = 'admin-v17';

  deviceInfo: any = null
  // title = 'ngx-quill-example'
  constructor(
    // private deviceService: DeviceDetectorService,
    public script: ScriptService,
    public virtualRouter: virtualRouter,
    public global: GlobalService
  ) {
    const scriptNames = ScriptStore.map(script => script.name);


    this.script.load(...scriptNames).then(() => {
      setTimeout(() => {
        this.global.loadSoluciones();
        this.global.loadRubros();
        this.global.loadClientes();
        this.global.loadTestimonios();
        this.global.loadIntegrations();
        this.global.loadModulos();
        this.global.loadPosts();
        // this.epicFunction();
      }, 2000);
    }).catch(error => {
      console.error('Error loading scripts', error);
    });

  }
  goHome() {
    this.virtualRouter.routerActive = 'home';
  }
  animatePercentage() {
    let counter = 0;
    const element = this.percentage.nativeElement;

    const interval = setInterval(() => {
      if (counter === 100) {
        clearInterval(interval);
      } else {
        counter++;
        element.textContent = counter + '%';
      }
    }, 2000);
  }
  ngOnInit(): void {
    setTimeout(() => {
      this.showContent = true;
    }, 2000); // 5000 milliseconds = 5 seconds

    // this.animatePercentage();
    // this.epicFunction();
  }
}
