import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { TokenStorageService } from '../token-storage-service.service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})

export class inicioComponent {
  searchTerm: string = '';
  selectedCategory: string = 'Todos';
  menuOpen: boolean = false;
  userLoggedIn: boolean = false;
  userData: any = null;
  isAdmin: boolean = false;

  categories: string[] = [
    'Todos', 'Calzado', 'Parte de Arriba', 'Parte de Abajo', 'Ropa Interior'
  ];

  products = [];
  filteredProducts: any;

  constructor(private router: Router, private apiService: ApiService, private tokenStorage: TokenStorageService) {}

  ngOnInit() {
    this.checkUserLogin();
    this.apiService.getProductos().subscribe(data => {
      this.products = data.posts;
      this.filteredProducts = [...this.products];
      console.log(data);
    });
  }

  checkUserLogin() {
    this.userLoggedIn = this.tokenStorage.isLoggedIn();
    if (this.userLoggedIn) {
      this.userData = this.tokenStorage.getUser();
      this.isAdmin = this.userData?.rol === 'Moderador';
    }
  }

  filterProducts() {
    this.filteredProducts = this.products.filter((product: { title: string; description: string; }) => {
      return product.title.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
             (this.selectedCategory === 'Todos' || product.description === this.selectedCategory);
    });
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
    this.filterProducts();
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  getProductsByCategory(category: string) {
    return category === 'Todos' ? this.filteredProducts : this.filteredProducts.filter((product: { description: string; }) => product.description === category);
  }

  viewProduct(productId: string) {
    this.router.navigate(['/product', productId]);
  }

  goToLogin() {
    this.router.navigate(['/inicio-sesion']);
  }

  goToRegister() {
    this.router.navigate(['/registro']);
  }

  logout() {
    this.tokenStorage.singOut();
    this.userLoggedIn = false;
    this.userData = null;
    this.isAdmin = false;
    this.router.navigate(['/inicio']).then(() => {
      window.location.reload();
    });
  }

  goToProfile() {
    this.router.navigate(['/perfil']);
  }

  deleteProduct(productId: string) {
    /*this.apiService.deleteProduct(productId).subscribe(() => {
      this.products = this.products.filter(product => product.id !== productId);
      this.filteredProducts = this.filteredProducts.filter(product => product.id !== productId);
    });*/
  }

  editProduct(productId: string) {
   /* this.router.navigate(['/editar-producto', productId]);*/
  }
}
