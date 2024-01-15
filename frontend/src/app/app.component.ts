import { Component } from '@angular/core';
import { RefreshService } from './services/refresh.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  refresh:boolean= false;

  constructor(private _refresh:RefreshService){}

  ngOnInit():void{
    this._refresh.getEvent().subscribe((data) => {
      this.refresh = data;
    });
  }


 
}
