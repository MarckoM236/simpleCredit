import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RefreshService {

  private event = new Subject<any>();

  constructor() { }
  
  // emit event
  emitEvent(data: any) {
    this.event.next(data);
  }

  // subscribe to events
  getEvent() {
    return this.event.asObservable();
  }
}
