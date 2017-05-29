import {Injectable} from '@angular/core'
import { CanActivate , Router } from '@angular/router'
import { AuthService } from '../service/auth.service'


@Injectable()
export class CanActivateAuthGuard implements CanActivate {

    constructor(private authservice:AuthService , private router:Router ){}

    canActivate() {
        if(localStorage.getItem('token')){
            return true;
        }
        else{
            this.router.navigate(['/signin'])
        }
        return false
    }
}