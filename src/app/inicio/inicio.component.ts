import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
 
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
 
  categories: string[] = [
    'Todos', 'Calzado', 'meencantaelpene', 'Parte de Arriba', 'Parte de Abajo', 'Ropa Interior'
  ];
 
  products = [];
 
 
 
 
  filteredProducts:any
 
  constructor(private router: Router, private apiService: ApiService) {} //coneccion al bak 
 
  ngOnInit() {
    this.checkUserLogin(); 
    this.apiService.getProductos().subscribe(data => { //coneccion al bak 
      this.products = data.posts;
      this.filteredProducts = [...this.products];
      console.log(data);
    });
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
 
  checkUserLogin() {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      this.userLoggedIn = true;
      this.userData = JSON.parse(storedUser);
    }
  }
 
  logout() {
    localStorage.removeItem('loggedInUser');
    this.userLoggedIn = false;
    this.userData = null;
  }
 
  goToProfile() {
    this.router.navigate(['/perfil']);
  }
 
}