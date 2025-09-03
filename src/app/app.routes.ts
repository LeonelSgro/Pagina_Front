import { provideHttpClient } from '@angular/common/http';
import { Routes, provideRouter } from '@angular/router';

import { AnadirComponent } from './anadir/anadir.component';
import { DetalleComponent } from './detalle/detalle.component';
import { EditarComponent } from './editar/editar.component';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { inicioComponent } from './inicio/inicio.component';
import { ProfileComponent } from './perfil/perfil.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { RegistroComponent } from './registro/registro.component';

export const routes: Routes = [
  { path: '', component: inicioComponent },
  { path: 'product/:id', component: ProductDetailComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'inicio-sesion', component: InicioSesionComponent },
  { path: 'perfil', component: ProfileComponent },
  { path: 'anadir', component: AnadirComponent },
  { path: 'detalle/:id', component: DetalleComponent },
  { path: 'editar/:id', component: EditarComponent },
  { path: '**', redirectTo: '' }, // Manejar rutas inválidas
];

export const appProviders = [provideRouter(routes), provideHttpClient()];
