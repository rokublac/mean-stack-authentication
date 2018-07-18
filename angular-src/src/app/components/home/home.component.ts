import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: Object;

  constructor(private authService: AuthService) { }

  // home page - hide register and login buttons if logged in.
  ngOnInit() {
    if(this.authService.loggedIn()){
      this.authService.getProfile().subscribe(profile => {
        this.user = profile.user;
        console.log(`Logged in. Hello, ${profile.user.name}!`);
      },
      err => {
        console.log(err);
        return false;
      });
    } else {
      console.log('Not logged in.')
    }
  }
}
  	

