import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment';
 
 
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  registrar(user: { nombre: string; email: string; password: string; telefono: string; }) {
    throw new Error('Method not implemented.');
  }
  private apiUrl = environment.apiUrl +"/Posts"; //cambio el path y funcionan
 
  constructor(private http: HttpClient) { }
 
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
}
 