import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { products } from '../products';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: any; // Almacena los detalles del producto
  newComment: string = ''; // Almacena el nuevo comentario
  comments: string[] = []; // Lista de comentarios

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Obtiene el ID del producto de la URL
    const productId = this.route.snapshot.paramMap.get('id');
    // Busca el producto en la lista de productos
    this.product = products.find(p => p.id === productId);
    // Construye la ruta correcta de la imagen
    if (this.product) {
      this.product.image = `assets/${this.product.image}`;
    }
  }

  // Agrega un nuevo comentario
  addComment() {
    if (this.newComment.trim()) {
      this.comments.push(this.newComment);
      this.newComment = ''; // Limpia el campo de texto
    }
  }
}