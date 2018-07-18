import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service'; 


@Injectable()
export class AuthGuard implements CanActivate{
	constructor(private authService: AuthService, private router: Router){

	}

	// check if user is logged in - allow access to private routes (dashboard and profile)
	canActivate(){
		if(this.authService.loggedIn()){
			return true;
		} else {
			// navigate user to login if they are trying to access a restricted route
			this.router.navigate(['/login']);
			return false;
		}
	}
}