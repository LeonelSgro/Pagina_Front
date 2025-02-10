import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inicio-sesion',
  standalone: true,
  imports: [FormsModule], 
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css'],
})
export class InicioSesionComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  onSubmit(): void {
    const storedUser = localStorage.getItem('registeredUser');

    if (storedUser) {
      const userData = JSON.parse(storedUser);
      if (userData.email === this.email && userData.password === this.password) {
        localStorage.setItem('loggedInUser', JSON.stringify(userData));
        console.log('Inicio de sesión exitoso');
        this.router.navigate(['/']);
      } else {
        alert('Correo o contraseña incorrectos.');
      }
    } else {
      alert('No hay usuarios registrados.');
    }
  }
}
