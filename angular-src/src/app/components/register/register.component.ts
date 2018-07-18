import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service'; // form validation service
import { AuthService } from '../../services/auth.service' // backend form submission
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
	name: String;
	username: String;
	email: String;
	password: String;

  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit() {
  }

  // registration form submission
  onRegisterSubmit(){
  	// form object
  	const user = {
  		name: this.name,
  		username: this.username,
  		email: this.email,
  		password: this.password
  	}

  	// chack all input fields
  	if(!this.validateService.validateRegister(user)){
  		this.flashMessage.show('please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
  		return false;
  	}

  	// validate email
  	if(!this.validateService.validateEmail(user.email)){
  		this.flashMessage.show('please use a valid email', {cssClass: 'alert-danger', timeout: 3000});
  		return false;
  	}

    // register user - submit to backend database
    this.authService.registerUser(user).subscribe(data => {
      if(data.success){
        this.flashMessage.show('Registration complete - can now login', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/login']);
     } else {
       this.flashMessage.show('Oops, something went wrong!', {cssClass: 'alert-danger', timeout: 3000});
       this.router.navigate(['/register']);
     }
   });

  }
  
}
