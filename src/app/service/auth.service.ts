import {Injectable } from '@angular/core'
import {Http , Headers ,RequestOptions } from '@angular/http'
import {Router} from '@angular/router'

import { Observable } from 'rxjs/RX'
import 'rxjs/add/operator/map'
//import 'rxjs/Rx'; //For complete

import {User} from '../shared/user.interface' 

@Injectable()
export class AuthService{

    public serverurl = 'http://localhost:3000/'
    public isloggedin:boolean;

    constructor(private http : Http ,private router:Router){

    }

    signin(user:User) : Observable<any>{
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.serverurl+'auth/signin', user, options).map(data => {
            data= data.json()
            return data
        })
    }

    signup(user:User) : Observable<any>{
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.serverurl+'auth/signup', user , options).map(data=> data.json())
    }

    signout(){
        localStorage.removeItem('token')
    }
}