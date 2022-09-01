import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../login/service/auth.service';
import { RegisterModel } from './model/register.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerModel: RegisterModel = new RegisterModel();

  constructor(
    private _auth: AuthService,
    private _router: Router
  ) { }

  ngOnInit(): void {
  }

  setImage(event: any){
    this.registerModel.image = event.target.files[0];
  }

  register(){
    let formData = new FormData();
    formData.append("name", this.registerModel.name);
    formData.append("password", this.registerModel.password);
    formData.append("email", this.registerModel.email);    
    formData.append("image",this.registerModel.image, this.registerModel.image.fileName);

    this._auth.register(formData).subscribe((res)=>{
      this._router.navigateByUrl("/login");
    })
  }

}
