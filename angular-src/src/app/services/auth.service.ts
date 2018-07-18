import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import {tokenNotExpired} from 'angular2-jwt';


@Injectable()
export class AuthService {

  authToken: any;
  user: any;

  constructor(private http: Http) { }

  // post registration details to end point /register
  registerUser(user){
  	// new header instance
  	let headers = new Headers();
  	headers.append('Content-type', 'application/json');
  	// post as json data
  	return this.http.post('users/register', user, {headers: headers}).map(res => res.json());
  }

  // authenticate user
  authenticateUser(user){
    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    // post as json data
    return this.http.post('users/authenticate', user, {headers: headers}).map(res => res.json());
  }

  // get user profile
  getProfile(){
    let headers = new Headers();
    // grab token from local storage
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.get('users/profile', {headers: headers}).map(res => res.json());
  }

  // store user data when logged in
  storeUserData(token, user){
    localStorage.setItem('id_token', token);
    // local storage can only store strings so we need to change JSON to string
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  // logout
  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  // fetch user token to access profile
  loadToken(){
    // get token from local storage
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  // JWT token for auth guard - hiding certain links depending on if the user is logged in or not.
  loggedIn(){
    return tokenNotExpired('id_token');
  }
}
