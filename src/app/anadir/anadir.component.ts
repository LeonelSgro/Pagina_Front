import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service'; // ✅ Importar servicio API

@Component({
  selector: 'app-anadir',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './anadir.component.html',
  styleUrls: ['./anadir.component.css']
})
export class AnadirComponent {
  publication = {
    title: '',
    description: '',
    price: null,
    images: [''], // ✅ Array de imágenes
    createdAt: new Date().toISOString().replace('T', ' ').replace('Z', ''), // Ajuste de formato
  };

  constructor(private router: Router, private apiService: ApiService) {}

  addPublication() {
    const storedUser = sessionStorage.getItem('USER_KEY'); // Obtener usuario desde sessionStorage
    if (!storedUser) {
      console.error("No hay usuario en sesión.");
      return;
    }
  
    const user = JSON.parse(storedUser);
    const userId = user.id; // Extraer el ID del usuario
  
    // Agregar la fecha actual al objeto publicación
    this.publication.createdAt = new Date().toISOString();
  
    // Llamar a la API con el ID del usuario en la URL
    this.apiService.crearProducto(userId, this.publication).subscribe(
      (response: any) => {
        console.log('Publicación creada con éxito', response);
        this.router.navigate(['/perfil']); // Redirigir al perfil
      },
      error => {
        console.error('Error al crear publicación', error);
      }
    );
  }
  

  // ✅ Agregar nuevo campo de imagen
  addImageField() {
    this.publication.images.push('');
  }

  // ✅ Eliminar campo de imagen
  removeImageField(index: number) {
    this.publication.images.splice(index, 1);
  }
}
