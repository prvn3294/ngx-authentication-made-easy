import { Component, OnInit } from '@angular/core';

import { FormGroup , FormBuilder , FormControl , Validators } from '@angular/forms';
import {User} from '../shared/user.interface'
import {AuthService} from '../service/auth.service'
import { Router } from '@angular/router'


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  public myForm: FormGroup; 
    public submitted: boolean; 
    public loginfailed: boolean = false
    public failmsg

  constructor(private _fb: FormBuilder , private authservice : AuthService , private router:Router ) { }

  ngOnInit() {
    
      this.myForm = this._fb.group({
        email : ['', [<any>Validators.required] ],
        password :['', [<any>Validators.required, <any>Validators.minLength(5)] ]
      })
  }

  signin(user: User, isValid: boolean) {
        this.submitted = true; 
        console.log(user, isValid);

        this.authservice.signin(user).subscribe(data=>{
          if(data.success==false){
              this.loginfailed = true;
              this.failmsg = data.message
          }
          if(data.success == true){
            localStorage.setItem('token', data.token);
            this.router.navigateByUrl('/home')
           }
        })
    }
}
