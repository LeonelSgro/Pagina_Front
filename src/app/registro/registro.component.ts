import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule], // Importa FormsModule para usar ngModel
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent {
  nombre: string = '';
  email: string = '';
  password: string = '';
  telefonoCodigo: string = '+54'; // El código de país por defecto
  telefonoArea: string = '11'; // El código de área por defecto
  telefonoNumero: string = ''; // El número del teléfono

  constructor(private router: Router) {}

  onSubmit(): void {
    // Aquí podemos combinar todos los valores del teléfono en un solo campo
    const telefonoCompleto = `${this.telefonoCodigo} (${this.telefonoArea}) ${this.telefonoNumero}`;

    // Guardamos los datos del usuario en localStorage
    const user = {
      nombre: this.nombre,
      email: this.email,
      password: this.password,  // Asegúrate de encriptar la contraseña si la vas a usar más adelante
      telefono: telefonoCompleto,
    };

    localStorage.setItem('loggedInUser', JSON.stringify(user)); // Guardamos los datos en localStorage

    // Redirigir al usuario después del registro
    this.router.navigate(['/inicio-sesion']);
  }
}
