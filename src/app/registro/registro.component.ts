import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule], // Importa FormsModule para usar [(ngModel)]
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent {
  nombre: string = '';
  email: string = '';
  location: string = ''; // Nueva propiedad para la ubicación
  password: string = '';
  telefonoCodigo: string = '+54'; // Código de país por defecto
  telefonoArea: string = '11'; // Código de área por defecto
  telefonoNumero: string = ''; // Número de teléfono
  Admin: boolean = false; // Nueva propiedad para el rol de administrador

  constructor(private router: Router, private apiService: ApiService) {}

  onSubmit(): void {
    const telefonoCompleto =
      `${this.telefonoCodigo}${this.telefonoArea}${this.telefonoNumero}`.replace(
        /\D/g,
        ''
      );

    const user = {
      id: '',
      name: this.nombre,
      gmail: this.email,
      location: this.location,
      password: this.password,
      phoneNumber: Number(telefonoCompleto),
      clothes: [],
      Admin: this.Admin,
    };

    this.apiService.registerUser({ user }).subscribe(
      (response) => {
        console.log(user);
        console.log('Usuario registrado:', user);
        this.router.navigate(['/inicio']); // Redirigir después del registro
      },
      (error) => {
        console.error('Error al registrar usuario:', error);
      }
    );
  }
}

/*register(usuario: IUsuario): Observable<{ token: string }> {
  return this.http.post<{ token: string }>(${this.apiURL}/api/system/register, { usuario: usuario }).pipe(
    map(response => {
      localStorage.setItem('tokenUser', JSON.stringify(response.token)); // Store JWT after successful registration
      console.log("[FRONTEND LOG] Token guardado:", response.token);
      return response;
    }),
    catchError(error => {
      console.error('[ERROR]: Registration failed', error);
      return throwError(() => new Error(error));
    })
  );
}*/ //usar funcion de referencia (BARRIO - IAN, si se dignan BOE"
