import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service'; 


@Injectable()
export class AuthGuardLoggedIn implements CanActivate{
	constructor(private authService: AuthService, private router: Router){

	}
	// this is a guard for logged in users
	// prevents routing to 'log in' and 'register routes'
	canActivate(){
		if(!this.authService.loggedIn()){
			return true;
		} else {
			// if user is logged in and trying to access 'login' and 'register' routes - direct to profile page.
			this.router.navigate(['profile']);
			return false;
		}
	}
}