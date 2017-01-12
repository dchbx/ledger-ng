import { Component, OnInit } from '@angular/core';
import { Employer } from '../models/employer';
import { EmployerService } from '../employers.service';
import { Permissions } from '../permissions';
//import { Observable } from 'rxjs';


@Component({
  selector: 'app-employers',
  templateUrl: './employers.component.html',
  styleUrls: ['./employers.component.css'],
  providers: [EmployerService]
})
export class EmployersComponent implements OnInit {

  employers = [];
  public checkToken = false;
  
  model = new Employer();
  
  constructor(private employerService: EmployerService, private permissions:Permissions) { }

  ngOnInit() {
    this.getEmployers();
    //let timer = Observable.timer(2000, 5000);
    //timer.subscribe(() => this.getEmployers());
  }
  
  getEmployers() {
    	this.employerService.getEmployers()
  	  .subscribe(
  	  	employers => this.employers = employers,
  		  err => {
  			  console.log('Error with the token');
          this.checkToken = true;
  		  });
  }
  
  createEmployers(data) {
  	  this.employerService.createEmployer(data)
        .subscribe(
          employer => {
            this.employers.push(employer);
            $('.modal').removeClass('in');
            $('.modal').attr("aria-hidden","true");
            $('.modal').css("display", "none");
            $('.modal-backdrop').remove();
            $('body').removeClass('modal-open');
          },
          err => {
            console.log(err);
            this.checkToken = true;
          });
  }
  
  deleteEmployer(e, i) {
      this.employerService.deleteEmp(e)
        .subscribe(
          e => {
            //Removes the post from view by index postion, how many to be removed
            this.employers.splice(i, 1);
          },
          err => {
            console.log(err);
          });
    }
}
