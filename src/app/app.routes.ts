import { Routes } from '@angular/router';
import { inicioComponent } from './inicio/inicio.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { RegistroComponent } from './registro/registro.component';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { ProfileComponent } from './perfil/perfil.component';
import { AnadirComponent } from './anadir/anadir.component';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';


@NgModule({
  imports: [
    HttpClientModule
  ],
})
export class AppModule { }


export const routes: Routes = [
  { path: '', component: inicioComponent },
  { path: 'product/:id', component: ProductDetailComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'inicio-sesion', component: InicioSesionComponent },
  { path: 'perfil', component: ProfileComponent },
  { path: 'anadir', component: AnadirComponent }
];
