import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { Routes , RouterModule , CanActivate} from '@angular/router'

import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { HomeComponent } from './home/home.component';
import { AuthService } from './service/auth.service';
import { CanActivateAuthGuard } from './guards/auth.guard'

const appRoutes: Routes = [
  { path: 'signup',   component: SignupComponent },
  { path: 'signin',   component: SigninComponent },
  { path: 'home',     component: HomeComponent, canActivate :[CanActivateAuthGuard] },
  { path: '', redirectTo:'/signin' , pathMatch:'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule 
  ],
  providers: [ AuthService , CanActivateAuthGuard ],
  bootstrap: [AppComponent]
})
export class AppModule { }
