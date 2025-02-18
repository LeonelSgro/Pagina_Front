import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { products } from '../products';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: any = {};
  user: any = {};
  newComment: string = '';
  comments: string[] = [];

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
    // Obtiene el ID del producto de la URL
    const productId = this.route.snapshot.paramMap.get('id');

    if (productId) {
      this.apiService.getProductoById(productId).subscribe(data => {
        this.product = data.post;
        this.user = data.user; // Obtener los datos del usuario asociados al producto
        console.log(data);
      });
    }
  }
}
