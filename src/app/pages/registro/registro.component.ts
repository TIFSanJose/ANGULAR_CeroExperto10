import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UserModel;

  constructor( private authService: AuthService ) { }

  ngOnInit() {
    this.usuario = new UserModel();

    this.usuario.email = 'ramon@ramon.com';
  }

  onSubmit = ( form: NgForm ) => {

    if(!form.valid){return;}
    
    this.authService.registro( this.usuario )
      .subscribe( resp => {
        console.log(resp);
        
      }, (err => {
        console.log(err.error.error.message);
        
      }) )
    
    
  }
}
