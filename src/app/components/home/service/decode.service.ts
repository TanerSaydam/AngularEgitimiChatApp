import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class DecodeService {

  jwt: JwtHelperService = new JwtHelperService;

  constructor() { }

  getUserId(){    
    let decode = this.jwt.decodeToken(localStorage.getItem("token"));    
    let userId = Object.keys(decode).filter(x=> x.endsWith("/nameidentifier"))[0];    
    return decode[userId];
  }
}
