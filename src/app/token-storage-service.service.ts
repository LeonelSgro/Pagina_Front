import { Injectable } from '@angular/core';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { HttpHeaders } from '@angular/common/http';
import { UserInterfaceComponent } from './user-interface/user-interface.component';

@Injectable({
  providedIn: 'root',
})

export class TokenStorageService {
  constructor() {}

  singOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem('TOKEN_KEY');
    window.sessionStorage.setItem('TOKEN_KEY', token);
    this.saveUser();
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem('TOKEN_KEY');
  }

  public saveUser(): void {
    window.sessionStorage.removeItem('USER_KEY');
    const user = this.getDecodedToken();
    delete user?.iat;
    delete user?.exp;
    window.sessionStorage.setItem('USER_KEY', JSON.stringify(user));
    console.log(sessionStorage.getItem('USER_KEY'));
  }

  public getUser(): UserInterfaceComponent {
    const user = window.sessionStorage.getItem('USER_KEY');
    if (user) {
      const parsed = JSON.parse(user);
      parsed.password = 'a';
      return parsed;
    }

    return {
      id:'',
      name: 'a',
      gmail: 'a',
      password: 'a',
      phoneNumber: 0,
      clothes: [],
      Admin: false
    };
  }

  public getRol(): string {
    const user = window.sessionStorage.getItem('USER_KEY');
    if (user) {
      const parsed = JSON.parse(user);
      return parsed.rol;
    }
    return "";
  }

  getDecodedToken(): JwtPayload | null {
    const token = this.getToken();
    if (token) {
      try {
        return jwtDecode<JwtPayload>(token);
      } catch (error) {
        console.error('Error decoding token', error);
        return null;
      }
    }
    return null;
  }

  public header(): any {
    const token = this.getToken();
    console.log('Token enviado en header:', token); // Agrega este log
    return new HttpHeaders({
      'x-access-token': token || '',
    });
  }
  

  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }

    const decodedToken = this.getDecodedToken();
    if (!decodedToken) {
      return false;
    }

    // Verifica si el token ha expirado
    const currentTime = Math.floor(Date.now() / 1000); // Tiempo actual en segundos
    if (decodedToken.exp && decodedToken.exp < currentTime) {
      this.singOut();
      return false;
    }

    return true;
  }
}