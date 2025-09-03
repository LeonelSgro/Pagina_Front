import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle.component.html',
  styleUrl: './detalle.component.css',
})
export class DetalleComponent {
  expandedImage: string | null = null;

  expandImage(img: string | null) {
    this.expandedImage = img;
  }
  revealPhone = false;
  id!: string;
  producto!: {
    id: number;
    title: string;
    description: string;
    price: number;
    images: string[];
    createdAt: Date;
    category:
      | 'Calzado'
      | 'Parte de Arriba'
      | 'Parte de Abajo'
      | 'Ropa Interior';
  };
  nombreUsuario!: string;
  numeroTelefono!: string;

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  getImageSrc(index: number): string {
    return (
      'http://localhost:3000/api/Posts/image/' + this.producto.id + '/' + index
    );
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      console.log(this.id);
    });

    // load product details using this.id
    if (this.id) {
      this.apiService.getProductoById(this.id).subscribe((data) => {
        this.producto = data.post;
        this.nombreUsuario = data.user.name;
        this.numeroTelefono = '+' + data.user.phoneNumber.toString();

        console.log(this.producto);
      });
    }
  }
}
