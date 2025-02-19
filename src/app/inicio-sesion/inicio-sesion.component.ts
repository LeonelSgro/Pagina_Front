import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { UserInterfaceComponent } from '../user-interface/user-interface.component';
import { TokenStorageService } from '../token-storage-service.service';



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

  constructor(private router: Router, private apiService: ApiService,private tokenStorageService: TokenStorageService) {}

  onSubmit(): void {
    const user: UserInterfaceComponent = {
      id: '',
      name: '',
      gmail: this.email,
      password: this.password,
      phoneNumber: 0,
      clothes: [],
      Admin: false
    };
  
    console.log("Datos enviados:", JSON.stringify({ user }, null, 2)); // Verifica que user no es null
  
    if (!user.gmail || !user.password) {
      console.error("Error: email o password están vacíos");
      return;
    }
  
    this.apiService.LogIn({ user }).subscribe(
      (response: any) => {
        console.log('Inicio de sesión exitoso', response);
        this.tokenStorageService.saveToken(response.jwt);
        this.router.navigateByUrl('/inicio');
      },
      error => {
        console.error('Error en el inicio de sesión', error);
      }
    );
  }


  isValidEmail(email: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  
}





  /*checkIn(): void{
    this.apiService.logIn(storedUser).subscribe({
      next: (data) => {
        console.log("[LOGIN LOG] Login exitoso, navegando...");
        
        this.router.navigate(['/main']);
      },
      error: (error) => {
        console.log("[ERROR LOGIN]: Login erroneo::", error);
      }
    });  }*/


