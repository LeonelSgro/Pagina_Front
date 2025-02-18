import { Routes, provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { importProvidersFrom } from '@angular/core';

import { inicioComponent } from './inicio/inicio.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { RegistroComponent } from './registro/registro.component';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { ProfileComponent } from './perfil/perfil.component';
import { AnadirComponent } from './anadir/anadir.component';

export const routes: Routes = [
  { path: '', component: inicioComponent },
  { path: 'product/:id', component: ProductDetailComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'inicio-sesion', component: InicioSesionComponent },
  { path: 'perfil', component: ProfileComponent },
  { path: 'anadir', component: AnadirComponent },
  { path: '**', redirectTo: '' } // Manejar rutas inválidas
];

export const appProviders = [
  provideRouter(routes), 
  provideHttpClient()
];
