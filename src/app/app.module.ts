import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthenticationService } from './authentication.service';
import { AuthGuard } from './auth.guard';
import { Permissions } from './permissions';
import { EmployersComponent } from './employers/employers.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

const appRoutes: Routes = [
	{ path: '', redirectTo: '/employers', pathMatch: 'full' },
	{ path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
	{ path: 'employers', component: EmployersComponent, canActivate: [AuthGuard] },
  // otherwise redirect to home
  { path: '**', redirectTo: 'home'}
];

@NgModule({
  declarations: [
    AppComponent,
    EmployersComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AuthGuard, AuthenticationService, Permissions],
  bootstrap: [AppComponent]
})
export class AppModule { }
