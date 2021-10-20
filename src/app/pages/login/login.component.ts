import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TimeoutError } from 'rxjs';
import { UserModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
// import Swal from 'sweetalert2/dist/sweetalert2.js'
import Swal from '../../../../node_modules/sweetalert2/dist/sweetalert2.all.min.js'
import {  Router } from '@angular/router';
import { isEmpty } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  usuario:  UserModel = new UserModel();
  recordar: boolean   = false;

  constructor(  private authService : AuthService,
                private router      : Router) { }

  ngOnInit() {
    if(localStorage.getItem('email')){
      this.usuario.email = localStorage.getItem('email');
      this.recordar = true;
    }
  }

  onSubmit = ( form: NgForm ) => {

    if(!form.valid){return;}

    Swal.fire({
      type: 'info',
      title: 'OK',
      text: 'Espere...',
      icon: 'info',
      allowOutsideClick: false
    })

    Swal.showLoading();

    this.authService.login( this.usuario )
      .subscribe( resp => {
      
        Swal.close();
        
        console.log(this.recordar);
        
        if(this.recordar){
            localStorage.setItem('email', this.usuario.email);
        }
        
        console.log(this.recordar);
        
      this.router.navigateByUrl('/home');

      }, (err) => {
        // console.log(err.error.error.message);
          Swal.fire({
            type: 'error',
            icon: 'error',
            titleText: 'Login Error',
            text: err.error.error.message,
            backdrop: true,
          });
      } )
    

  }
    
    
  
}
