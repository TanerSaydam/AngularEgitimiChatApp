import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginModel } from './model/login.model';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = "";
  password: string = "";

  constructor(
    private _auth: AuthService,
    private _router: Router
  ) { }

  ngOnInit(): void {
  }

  login(){
    let model = new LoginModel()
    model.email = this.email;
    model.password = this.password;

    this._auth.login(model).subscribe((res)=>{
      localStorage.setItem("token",res.data.accessToken);
      this._router.navigateByUrl("/");
    })
  }

}
