import { Component } from '@angular/core';
import { RefreshService } from 'src/app/services/refresh.service';
import { UserInfoService } from 'src/app/services/user-info.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  name:string;
  constructor(private _user:UserInfoService,private _refresh:RefreshService){
    this.name = this._user.getUserData().name;
  }

  ngOnInit():void{
    this._refresh.emitEvent(true);
  }

}
