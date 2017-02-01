import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';

@Injectable()
export class AuthenticationService {
    public token: string;
    public email: string;
    public admin: string;
	  public userEmail: string;
    private api = environment.envApi;
    
    constructor(private http: Http) {
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }

    login(user): Observable<boolean> {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        
        return this.http.post(this.api+'/users/sign_in.json', {"user":{ email: user.email, password: user.password }}, headers)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let token = response.json() && response.json().token;
                let admin = response.json() && response.json().admin;
                let email = response.json() && response.json().user;
                
                if (token) {
                    // set token property
                    this.token = token;
                    this.admin = admin;
                    this.email = email;
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ email: btoa(email), admin: btoa(admin), token: token }));
  
                    // return true to indicate successful login
                    return true;
                    
                } else {
                    // return false to indicate failed login
                    return false;
                }
            });
    }
    
    signUp(user): Observable<boolean> {
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      
      return this.http.post(this.api+'/users.json', {"user":{ email: user.email, password: user.password, password_confirmation: user.password_confirmation }}, headers)
          .map((response: Response) => {
              // login successful if there's a jwt token in the response
              let token = response.json() && response.json().token;
              let admin = response.json() && response.json().admin;
              let email = response.json() && response.json().user;

              if (token) {
                  // set token property
                  this.token = token;
                  this.admin = admin;
                  this.email = email;
                  // store username and jwt token in local storage to keep user logged in between page refreshes
                  localStorage.setItem('currentUser', JSON.stringify({ email: btoa(email), admin: btoa(admin), token: token }));

                  // return true to indicate successful login
                  return true;
                  
              } else {
                  // return false to indicate failed login
                  return false;
              }
          });
      
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
		    this.email = null;
        localStorage.removeItem('currentUser');
    }
}