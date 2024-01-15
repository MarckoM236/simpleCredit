import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  constructor() { }

  setUserData(userData: any): void {
    localStorage.setItem('userData', JSON.stringify(userData));
  }

  getUserData(): any {
    const storedUserData = localStorage.getItem('userData');
    return storedUserData ? JSON.parse(storedUserData) : null;
  }
}
