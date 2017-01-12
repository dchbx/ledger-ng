import { Injectable } from '@angular/core';


@Injectable()
export class Permissions {
  
  constructor() {}
    
  isAllowed(u) {
    const email = JSON.parse(localStorage.getItem('currentUser')).email;
    const user = atob(email);
    
    if (u.user == user) {
      return true;
    }
    false;
  }
}
