import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class ProfileComponent implements OnInit {
  user: any = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData() {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
    }
  }

  goToAddPublication() {
    this.router.navigate(['/anadir']);
  }

  deletePublication(index: number) {
    if (this.user && this.user.publications) {
      this.user.publications.splice(index, 1);
      localStorage.setItem('loggedInUser', JSON.stringify(this.user));

      // Volver a cargar los datos después de eliminar
      this.loadUserData();
    }
  }
}
