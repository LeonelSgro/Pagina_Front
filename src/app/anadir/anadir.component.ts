import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-anadir',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './anadir.component.html',
  styleUrls: ['./anadir.component.css']
})
export class AnadirComponent {
  publication = { title: '', description: '', image: '' };

  constructor(private router: Router) {}

  addPublication() {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      let user = JSON.parse(storedUser);
      if (!user.publications) {
        user.publications = [];
      }
      user.publications.push({ ...this.publication });

      // Guardar en localStorage
      localStorage.setItem('loggedInUser', JSON.stringify(user));

      // Regresar al perfil
      this.router.navigate(['/perfil']);
    }
  }
}
