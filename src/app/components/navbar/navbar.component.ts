import { Component, OnInit } from '@angular/core';
import { AuthService } from '../login/service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private _auth: AuthService
  ) { }

  ngOnInit(): void {
  }

  logout(){
    this._auth.logout();
  }
}
