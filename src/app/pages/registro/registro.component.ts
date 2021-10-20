import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from '../../../../node_modules/sweetalert2/dist/sweetalert2.all.min.js'

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

    // this.usuario.email = 'ramon@ramon.com';
  }
  
  onSubmit = ( form: NgForm ) => {

    Swal.fire({
      type: 'info',
      title: 'OK',
      text: 'Registro Completo',
      icon: 'info',
      // allowOutsideClick: false
    })
    Swal.showLoading();

    if(!form.valid){return;}
    
    this.authService.registro( this.usuario )
      .subscribe( resp => {

        console.log(resp);

 
  
        Swal.close();
        
      }, (err => {
        console.log(err.error.error.message);
            Swal.fire({
              type: 'error',
              icon: 'error',
              titleText: 'Error en Registro',
              text: err.error.error.message,
              backdrop: true,
            });        
      }) )
    
    
  }
}
