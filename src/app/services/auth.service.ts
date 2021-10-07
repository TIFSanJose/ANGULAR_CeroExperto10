import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL: string = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private API_KEY: string = 'AIzaSyD3FlAkV4ZVDqgRKq7RZQ_3aNR1D1a1OBA';

  usuario: UserModel = new UserModel();

  // Registro de Usuario
  // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

  // Inicio de Sesion
  // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  constructor( private _http: HttpClient ) { }

  login = () => {

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
    );
  }

}
