import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment';
import { UserInterfaceComponent } from '../user-interface/user-interface.component';
import { TokenStorageService } from '../token-storage-service.service';

 
 
@Injectable({
  providedIn: 'root'
})

export class ApiService {

  private apiUrl = environment.apiUrl +"/Posts"; //cambio el path y funcionan
  private apiUrlUsers = environment.apiUrl +"/useres"; //cambio el path y funcionan

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { }
  
  /*User routs*/
  registerUser(userData: any) {
    return this.http.post(`${this.apiUrlUsers}/add`, userData);
  }

  LogIn(userData: { user: UserInterfaceComponent }) {
    return this.http.post(`${this.apiUrlUsers}/login`, userData);
  }
  
  getUserProfileById(userId: string): Observable<any> {
    const headers = this.tokenStorage.header(); // Obtiene el token desde TokenStorageService
    return this.http.get(`${this.apiUrlUsers}/getone/${userId}`, { headers });
  }




  /*Product routs*/
  getProductos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/all`);
  }
 
  getProductoById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/getone/${id}`);
  }
 
  crearProducto(userId: string, data: any): Observable<any> {
    const payload = { post: data }; // Envolver los datos en un objeto con la clave "post"
  
    return this.http.post(`${this.apiUrl}/add/${userId}`, payload, {
      headers: this.tokenStorage.header() // Asegurar que el token se envía
    });
  }
  
  
 
  actualizarProducto(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${id}`, data, {
      headers: this.tokenStorage.header()
    });
  }
 
  eliminarProducto(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`, {
      headers: this.tokenStorage.header()
    });
  }
  
  
  


  getUsuarios(): Observable<any> {
    return this.http.delete(`${this.apiUrlUsers}/all`);
  }

  logIn():Observable<any>{
    return this.http.get(`${this.apiUrlUsers}/logIn`);
  }
}
 