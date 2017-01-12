import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  model: any = {};
  loading = false;
  error = '';

  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();
  }
  
  signUp() {
        this.loading = true;
        this.authenticationService.signUp(this.model)
            .subscribe(result => {
                if (result === true) {
                    this.router.navigate(['employers']);
                } else {
                    this.error = 'Username or password is incorrect';
                    this.loading = false;
                }
            });
    }
    
    submitted = false;
    
    onSubmit() { this.submitted = true; }

}
