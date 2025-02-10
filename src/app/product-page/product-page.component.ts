import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { products } from './products'; // Importa la lista de productos
import { FormsModule } from '@angular/forms'; // Importa FormsModule

@Component({
  selector: 'app-product-page',
  standalone: true, // Marca el componente como standalone
  imports: [FormsModule], // Añade FormsModule aquí
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {
  product: any;
  newComment: string = '';
  comments: string[] = [];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id'); // Obtiene el ID del producto
    this.product = products.find(p => p.id === productId); // Busca el producto por ID
  }

  addComment() {
    if (this.newComment.trim()) {
      this.comments.push(this.newComment);
      this.newComment = '';
    }
  }
}