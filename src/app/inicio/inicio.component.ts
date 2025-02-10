import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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
    'Todos', 'Calzado', 'Accesorios', 'Parte de Arriba', 'Parte de Abajo', 'Ropa Interior'
  ];

  products = [
    { id: '1', name: 'Zapatillas Deportivas', category: 'Calzado', image: 'assets/zapas.jpg' },
    { id: '2', name: 'Chanclas de Playa', category: 'Calzado', image: 'assets/chancla.jpg' },
    { id: '3', name: 'Cinturón de Cuero', category: 'Accesorios', image: 'assets/cinto.jpg' },
    { id: '4', name: 'Camisa Casual', category: 'Parte de Arriba', image: 'assets/camisa.jpg' },
    { id: '5', name: 'Jeans Ajustados', category: 'Parte de Abajo', image: 'assets/jean.jpg' },
    { id: '6', name: 'Boxers de Algodón', category: 'Ropa Interior', image: 'assets/boxers.jpg' }
  ];

  filteredProducts = [...this.products];

  constructor(private router: Router) {}

  ngOnInit() {
    this.checkUserLogin();
  }

  filterProducts() {
    this.filteredProducts = this.products.filter((product) => {
      return product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
             (this.selectedCategory === 'Todos' || product.category === this.selectedCategory);
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
    return category === 'Todos' ? this.filteredProducts : this.filteredProducts.filter(product => product.category === category);
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
