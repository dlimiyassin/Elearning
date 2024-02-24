import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}

  saveToken(data: any) {
    localStorage.setItem('accessToken', data.accessToken);
  }

  getToken() {
    return localStorage.getItem('accessToken');
  }

  removeToken() {
    localStorage.removeItem('accessToken');
  }

  payload(accessToken: any) {
    let decodedJwt = jwtDecode(accessToken);
    return decodedJwt;
  }
  isValid() {
    const token = this.getToken();

    if (token) {
      const payload = this.payload(token);
      if (payload) {
        return true;
      }
    }
    return false;
  }
  loggedIn() {
    return this.isValid();
  }

  getInfos() {
    const token = this.getToken();

    if (token) {
      const payload = this.payload(token);
      return payload ? payload : null;
    }

    return null;
  }
  
  handleResponse(data: any) {
    this.saveToken(data);
    this.changeAuthStatus(true);
  }

  private logged = new BehaviorSubject<boolean>(this.loggedIn());
  authStatus = this.logged.asObservable();
  changeAuthStatus(value: boolean) {
    this.logged.next(value);
  }
}
