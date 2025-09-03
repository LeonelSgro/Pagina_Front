import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-editar',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './editar.component.html',
  styleUrl: './editar.component.css',
})
export class EditarComponent {
  user: any = null;
  publicacion: any = null;
  id!: string;

  producto!: {
    id: string;
    title: string;
    description: string;
    price: number;
    images: { data: any; contentType: string }[];
    createdAt: Date;
    category:
      | 'Calzado'
      | 'Parte de Arriba'
      | 'Parte de Abajo'
      | 'Ropa Interior';
    deletedImages?: number[]; // indexes of server images to delete
    newImages?: { data: any; contentType: string }[]; // new images to upload
  };
  onFileChange(event: any) {
    const files = event.target.files;
    if (!this.producto.newImages) this.producto.newImages = [];
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const base64String = e.target.result.split(',')[1];
        this.producto.newImages!.push({
          data: base64String,
          contentType: files[i].type,
        });
      };
      reader.readAsDataURL(files[i]);
    }
  }

  removeImage(index: number) {
    // If the image is from the server (original), mark for deletion
    if (index < this.original.images.length) {
      if (!this.producto.deletedImages) this.producto.deletedImages = [];
      this.producto.deletedImages.push(index);
    } else {
      // Remove from newImages
      const newImgIdx = index - this.original.images.length;
      if (this.producto.newImages) {
        this.producto.newImages.splice(newImgIdx, 1);
      }
    }
  }

  getImageSrc(image: any, index: number): string {
    // If the image is marked for deletion, don't show it
    if (
      index < this.original.images.length &&
      this.producto.deletedImages?.includes(index)
    ) {
      return '';
    }
    if (!image) return '';
    if (typeof image === 'string') return image;
    // If the image is from the server
    if (this.original.images && index < this.original.images.length) {
      return `http://localhost:3000/api/Posts/image/${this.producto.id}/${index}`;
    }
    // If the image is a new upload
    if (image.data && image.contentType) {
      return `data:${image.contentType};base64,${image.data}`;
    }
    return '';
  }

  original!: {
    id: string;
    title: string;
    description: string;
    price: number;

    images: { data: any; contentType: string }[];
    createdAt: Date;
    category:
      | 'Calzado'
      | 'Parte de Arriba'
      | 'Parte de Abajo'
      | 'Ropa Interior';
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      console.log(this.id);
    });

    // load product details using this.id
    if (this.id) {
      this.apiService.getProductoById(this.id).subscribe((data) => {
        this.producto = data.post;
        this.original = { ...data.post }; // Guardar una copia del estado original
        console.log(this.producto);
      });
    }
  }

  saveChanges() {
    if (!this.producto) return;
    this.producto.images = this.original.images
      .filter((_, idx) => !this.producto.deletedImages?.includes(idx))
      .concat(this.producto.newImages || []);

    this.apiService.actualizarProducto(this.id, this.producto).subscribe(
      (response) => {
        if (response) {
          alert('Publicación actualizada' + response);
          this.router.navigate(['/']); // Redirigir al perfil
        }
        // navigate to profile after saving and force reload
        this.router.navigateByUrl('/perfil').then(() => {
          window.location.reload();
        });
      },
      (error) => {
        console.error('Error al actualizar la publicación', error);
      }
    );
  }

  // Cancelar la edición
  cancelEdit() {
    this.producto = { ...this.original }; // Restaurar el estado original
  }
}
