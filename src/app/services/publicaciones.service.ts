import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PublicacionesService {
  private publicaciones: any[] = [];

  constructor() {
    // Cargar publicaciones guardadas en localStorage
    const storedPublicaciones = localStorage.getItem('publicaciones');
    if (storedPublicaciones) {
      this.publicaciones = JSON.parse(storedPublicaciones);
    }
  }

  getPublicaciones() {
    return this.publicaciones;
  }

  addPublicacion(publicacion: any) {
    this.publicaciones.push(publicacion);
    localStorage.setItem('publicaciones', JSON.stringify(this.publicaciones));
  }

  deletePublicacion(index: number) {
    this.publicaciones.splice(index, 1);
    localStorage.setItem('publicaciones', JSON.stringify(this.publicaciones));
  }
}
