import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Employer } from './models/employer';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class EmployerService {
  employers:any;
  
  constructor(private http: Http) { }
  
  // Grabs Token from localStorage
  private authKey = window.localStorage.getItem('currentUser');
  private token = JSON.parse(this.authKey).token;
  // Creates headers and passes token to API to authenticate request
  private headers = new Headers({'Authorization': 'Bearer ' + this.token});
  private options = new RequestOptions({headers: this.headers});
  // Used to populate user fields for forms
  private user = JSON.parse(this.authKey).email;
  private api = environment.envApi;
  
  getEmployers(): Observable<Employer[]> {
	// ...using get request
  	return this.http.get(this.api+'/employers.json', this.options)
	// ...and calling .json() on the response to return data
    .map((res:Response) => res.json())
    //...errors if any
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
  // Creates employer on backend
  createEmployer(data): Observable<Employer[]> {
    let legal_name = data.legal_name;
    let hbx_id = data.hbx_id;
    let dba = data.dba;
    let fein = data.fein;
    let user = atob(this.user);

  	return this.http.post(this.api+'/employers.json', {"employer":{"legal_name":legal_name, "hbx_id":hbx_id, "dba":dba, "fein":fein, "user":user, "is_active":true}}, this.options)
	  // ...and calling .json() on the response to set data
	  .map((res:Response) => res.json())
    //...errors if any
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
  // Deletes employer from backend
  deleteEmp(data): Observable<Employer[]> {
      return this.http.delete(this.api+'/employers/'+data.id+'.json', this.options)
  	  // ...and calling .json() on the response to set data
  	  .map((res:Response) => res)
      //...errors if any
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
}