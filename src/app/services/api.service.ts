import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment';
 
 
@Injectable({
  providedIn: 'root'
})

export class ApiService {

  private apiUrl = environment.apiUrl +"/Posts"; //cambio el path y funcionan
  private apiUrlUsers = environment.apiUrl +"/useres"; //cambio el path y funcionan

  constructor(private http: HttpClient) { }
  
 
  registerUser(userData: any) {
    const payload = { user: userData }; // 🔹 Envolver datos dentro de "user"

    return this.http.post('http://localhost:3000/api/useres/add', payload, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  getProductos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/all`);
  }
 
  getProductoById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/getone/${id}`);
  }
 
  crearProducto(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/productos`, data);
  }
 
  actualizarProducto(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/productos/${id}`, data);
  }
 
  eliminarProducto(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/productos/${id}`);
  }


  getUsuarios(): Observable<any> {
    return this.http.delete(`${this.apiUrlUsers}/all`);
  }

  logIn():Observable<any>{
    return this.http.get(`${this.apiUrlUsers}/logIn`);
  }
}
 