import { Component, OnInit } from '@angular/core';
import { FormGroup , FormBuilder , FormControl , Validators } from '@angular/forms';
import {AuthService} from '../service/auth.service'
import {User} from '../shared/user.interface'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

    public myForm: FormGroup; 
    public submitted: boolean; 

  constructor(private _fb: FormBuilder , private authservice : AuthService) { }

  ngOnInit() {
    
      this.myForm = this._fb.group({
        email : ['', [<any>Validators.required] ],
        password :['', [<any>Validators.required, <any>Validators.minLength(5)] ]
      })
  }


  signup(user: User, isValid: boolean) {
        this.submitted = true; 
        console.log(user, isValid);

        this.authservice.signup(user).subscribe(data=>{
          console.log(data) 
       })
    }
}
