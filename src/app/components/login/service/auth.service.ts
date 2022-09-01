import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoginModel } from '../model/login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl: string = environment.apiUrl;

  constructor(
    private _http: HttpClient,
    private _router: Router
  ) { }

  login(model: LoginModel){
    let api = this.apiUrl + "chatAuth/login";   
    return this._http.post<any>(api,model);
  }

  register(formData: any){
    let api = this.apiUrl + "chatAuth/register";
    return this._http.post<any>(api, formData);
  }

  logout(){
    localStorage.clear();
    this._router.navigateByUrl("/login");
  }
}
