import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appProviders } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [...appProviders] // IMPORTANTE: Usar spread operator
}).catch(err => console.error(err));
