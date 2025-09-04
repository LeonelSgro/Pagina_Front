import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../environment';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './perfil.component.html',
  imports: [CommonModule, FormsModule],
  styleUrls: ['./perfil.component.css'],
})
export class ProfileComponent implements OnInit {
  user: any = null;
  publicacion: any = null;

  constructor(private router: Router, private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  getImageUrl(productId: string, index: number): string {
    return `${environment.apiUrl}/Posts/image/${productId}/${index}`;
  }
  loadUserData() {
    const storedUser = sessionStorage.getItem('USER_KEY'); // Obtener el JSON de sessionStorage
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser); // Convertir a objeto
        const userId = userData.id; // Extraer el ID

        if (userId) {
          this.apiService.getUserProfileById(userId).subscribe(
            (userDetails) => {
              this.user = userDetails.user; // Solo actualiza la variable user, no sessionStorage
              console.log(userDetails.user);
            },
            (error) => {
              console.error('Error al obtener los datos del usuario:', error);
            }
          );
        } else {
          console.error('No se encontró el ID del usuario en USER_KEY.');
        }
      } catch (error) {
        console.error('Error al analizar USER_KEY:', error);
      }
    } else {
      console.error('No se encontró USER_KEY en sessionStorage.');
    }
  }

  goToAddPublication() {
    this.router.navigate(['/anadir']);
  }

  deletePublication(index: number) {
    const publication = this.user.clothes[index]; // Asegúrate de que `publications` es el array correcto
    if (publication && publication.id) {
      this.apiService.eliminarProducto(publication.id).subscribe(
        (response) => {
          console.log('Publicación eliminada', response);
          this.user.clothes.splice(index, 1); // Opcional: eliminar del array localmente
        },
        (error) => {
          console.error('Error al eliminar la publicación', error);
        }
      );
    }
  }

  ///desde aca

  selectedPublication: any = null;

  modifyPublication(index: number) {
    this.router.navigate(['/editar', this.user.clothes[index].id]);
  }

  saveChanges() {
    if (!this.selectedPublication) return;

    const index = this.user.clothes.findIndex(
      (p: any) => p.id === this.selectedPublication.id
    );

    if (index !== -1) {
      this.apiService
        .actualizarProducto(
          this.selectedPublication.id,
          this.selectedPublication
        )
        .subscribe(
          (response) => {
            this.user.clothes[index] = { ...this.selectedPublication }; // Actualiza la publicación en el array
            this.selectedPublication = null; // Cierra el formulario de edición
          },
          (error) => {
            console.error('Error al actualizar la publicación', error);
          }
        );
    }
  }

  // Cancelar la edición
  cancelEdit() {
    this.selectedPublication = null;
  }
}
