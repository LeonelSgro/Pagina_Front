import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { TokenStorageService } from './token-storage-service.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterOutlet,
    InicioSesionComponent,
    RouterModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  menuOpen: boolean = false;
  userLoggedIn: boolean = false;
  userData: any = null;
  isAdmin: boolean = false;

  constructor(
    private router: Router,
    private tokenStorage: TokenStorageService
  ) {}

  ngOnInit() {
    this.checkUserLogin();
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  checkUserLogin() {
    this.userLoggedIn = this.tokenStorage.isLoggedIn();
    if (this.userLoggedIn) {
      this.userData = this.tokenStorage.getUser();
      this.isAdmin = this.userData?.rol === 'Moderador';
    }
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
}
