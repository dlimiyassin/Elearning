import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private Api = environment.apiUrl
  constructor(private http : HttpClient) { }

  public signIn(crediantils : {email : string, password : string}){
    return this.http.post(this.Api + '/auth/authenticate', crediantils);
  }
}
