import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserModel } from 'src/app/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  usuario: UserModel;

  constructor() { }

  ngOnInit() {
    this.usuario = new UserModel();
  }

  onSubmit = ( from: NgForm ) => {

    if( !from.valid ){ return; }
    console.log('formulario enviado');
    console.log(this.usuario);
    
    
  }
}
