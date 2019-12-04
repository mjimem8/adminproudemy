import { Component } from '@angular/core';
import { SettingsService } from './services/services.index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  //lo que declaremos en este constructor se ejecutará su constructor del compnente automaticamente
  constructor(public _ajustes: SettingsService){}

}
