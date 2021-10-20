import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';

import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL: string = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private API_KEY: string = 'AIzaSyD3FlAkV4ZVDqgRKq7RZQ_3aNR1D1a1OBA';

  usuario: UserModel = new UserModel();
  userToken: String;

  // Registro de Usuario
  // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

  // Inicio de Sesion
  // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  constructor( private _http: HttpClient ) {
    this.getToken();
  }

  login = ( usuario: UserModel ) => {
    const authData = {
      /**
       * esto es lo mismo que escribir ...usuario, operador spred.
      *  email             : usuario.email,
      *  password          : usuario.password,
       */
      ...usuario,
      returnSecureToken : true
    }
  
    console.log(authData.email);
    console.log(authData.returnSecureToken);
    console.log(authData.password);
    

    return this._http.post(
      `${this.URL}signInWithPassword?key=${this.API_KEY}`,
      authData
    ).pipe(
      map( resp => {
        this.guardarToken( resp['idToken']);
        return resp;
      })
    );

  }

  logout = ( usuario: UserModel ) => {

  }

  registro = ( usuario: UserModel ) => {
    const authData = {
      /**
       * esto es lo mismo que escribir ...usuario, operador spred.
      *  email             : usuario.email,
      *  password          : usuario.password,
       */
      ...usuario,
      returnSecureToken : true
    }

    return this._http.post(
      `${this.URL}signUp?key=${this.API_KEY}`,
      authData
      ).pipe(
        map( resp => {
            this.guardarToken( resp['idToken']);
            return resp;
        })
      );
    
  }

  private guardarToken = ( idToken: string) => {
    this.userToken = idToken;
    localStorage.setItem('token', idToken);
  }

  getToken = () => {
    if(localStorage.getItem['token']){
      this.userToken = localStorage.getItem['token'];
    }else{
      this.userToken = '';
    }
  }

}
