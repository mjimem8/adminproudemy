import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { RegisterComponent } from './login/register.component';

const appRoutes: Routes = [
    {path: 'login', component: LoginComponent },
    {path: 'register', component: RegisterComponent }, 
    {path: '**', component: NopagefoundComponent },
]; 

//path: '' -> ruta vacia
//path '**' -> rutas que no existan en la emplementacion de rutas

export const APP_ROUTES = RouterModule.forRoot(appRoutes, {useHash: true})