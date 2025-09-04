import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../environment';
import { ApiService } from '../services/api.service';
import { TokenStorageService } from '../token-storage-service.service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class inicioComponent {
  loading: boolean = false;
  searchTerm: string = '';
  selectedCategory: string = 'Todos';
  menuOpen: boolean = false;
  userLoggedIn: boolean = false;
  userData: any = null;
  isAdmin: boolean = false;

  categories: string[] = [
    'Todos',
    'Calzado',
    'Parte de Arriba',
    'Parte de Abajo',
    'Ropa Interior',
  ];

  products: any[] = [];
  totalProducts: number = 0;
  page: number = 1;
  limit: number = 8;
  totalPages: number = 1;

  // Track carousel index for each product by product id
  carouselIndexes: { [productId: string]: number } = {};

  constructor(
    private router: Router,
    private apiService: ApiService,
    private tokenStorage: TokenStorageService
  ) {}

  ngOnInit() {
    this.checkUserLogin();
    this.fetchProducts();
  }

  fetchProducts() {
    this.loading = true;
    this.apiService
      .getProductos(
        this.page,
        this.limit,
        this.searchTerm,
        this.selectedCategory
      )
      .subscribe({
        next: (data) => {
          this.products = data.posts;
          this.totalProducts = data.total || data.count || 0;
          this.totalPages = Math.ceil(this.totalProducts / this.limit) || 1;
          // Reset carousel indexes for new products
          for (const product of this.products) {
            if (!(product.id in this.carouselIndexes)) {
              this.carouselIndexes[product.id] = 0;
            }
          }
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        },
      });
  }

  getImageUrl(productId: string, index: number): string {
    return `${environment.apiUrl}/Posts/image/${productId}/${index}`;
  }

  checkUserLogin() {
    this.userLoggedIn = this.tokenStorage.isLoggedIn();
    if (this.userLoggedIn) {
      this.userData = this.tokenStorage.getUser();
      this.isAdmin = this.userData?.rol === 'Moderador';
    }
  }

  filterProducts() {
    // Reset to first page and fetch from server with new search term
    this.page = 1;
    this.fetchProducts();
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
    this.page = 1;
    this.fetchProducts();
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  getProductsByCategory(category: string) {
    return category === 'Todos'
      ? this.products
      : this.products.filter(
          (product: { category: string }) => product.category === category
        );
  }

  getProductList() {
    // Server already paginates and filters, just return products
    return this.products;
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.page = page;
    this.fetchProducts();
  }

  nextPage() {
    if (this.page < this.totalPages) {
      this.page++;
      this.fetchProducts();
    }
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.fetchProducts();
    }
  }

  prevImage(product: any) {
    if (!product.images || product.images.length < 2) return;
    const idx = this.carouselIndexes[product.id] || 0;
    this.carouselIndexes[product.id] =
      (idx - 1 + product.images.length) % product.images.length;
  }

  nextImage(product: any) {
    if (!product.images || product.images.length < 2) return;
    const idx = this.carouselIndexes[product.id] || 0;
    this.carouselIndexes[product.id] = (idx + 1) % product.images.length;
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

  goToDetalle(id: string) {
    console.log(id);
    this.router.navigate(['/detalle', id]);
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
    this.apiService.eliminarProducto(productId).subscribe(() => {
      this.products = this.products.filter(
        (product: any) => product.id !== productId
      );
      // No filteredProducts with server-side pagination
    });
  }

  editProduct(productId: string) {
    this.router.navigate(['/editar', productId]);
  }
}
