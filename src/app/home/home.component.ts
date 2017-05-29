import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authservice:AuthService ,  private router:Router ) { }

  ngOnInit() {
  }

  signout(){
    this.authservice.signout();
    this.router.navigateByUrl('/')
  }

}
