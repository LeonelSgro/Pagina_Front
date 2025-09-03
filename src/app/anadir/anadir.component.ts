import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service'; // ✅ Importar servicio API

@Component({
  selector: 'app-anadir',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './anadir.component.html',
  styleUrls: ['./anadir.component.css'],
})
export class AnadirComponent {
  publication = {
    title: '',
    category: '',
    description: '',
    price: 0,
    images: [] as { data: any; contentType: string }[],
    createdAt: new Date().toISOString().replace('T', ' ').replace('Z', ''), // Ajuste de formato
  };

  constructor(private router: Router, private apiService: ApiService) {}

  addPublication() {
    const storedUser = sessionStorage.getItem('USER_KEY'); // Obtener usuario desde sessionStorage
    if (!storedUser) {
      console.error('No hay usuario en sesión.');
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
      (error) => {
        console.error('Error al crear publicación', error);
      }
    );
  }

  getImageUrl(image: { data: any; contentType: string }): string {
    return `data:${image.contentType};base64,${image.data}`;
  }

  submitEnabled() {
    // log the reason why the button is disabled
    console.log('Submit enabled check:', this.publication);

    /*
    return !(
      this.publication.title &&
      this.publication.category &&
      this.publication.description &&
      this.publication.price &&
      this.publication.images.length > 0 &&
      // check that price is a positive number and has at most two decimal places
      this.publication.price > 0 &&
      /^\d+(\.\d{1,2})?$/.test(this.publication.price.toString())
    );
    */
  }

  onFileChange(event: any) {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const base64String = e.target.result.split(',')[1];
        this.publication.images.push({
          data: base64String,
          contentType: files[i].type,
        });
      };
      reader.readAsDataURL(files[i]);
    }
  }

  removeImage(index: number) {
    this.publication.images.splice(index, 1);
  }

  ngOnInit(): void {
    const storedUser = sessionStorage.getItem('USER_KEY'); // Obtener usuario desde sessionStorage
    if (!storedUser) {
      console.error('No hay usuario en sesión.');
      this.router.navigate(['/inicio-sesion']);
    }
  }
}
