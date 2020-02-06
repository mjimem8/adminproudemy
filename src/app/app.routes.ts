import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { RegisterComponent } from './login/register.component';
import { PagesComponent } from './pages/pages.component';
import { LoginGuardGuard } from './services/guards/login-guard.guard';

const appRoutes: Routes = [
    {path: 'login', component: LoginComponent },
    {path: 'register', component: RegisterComponent }, 
    {
        path: '',
        component: PagesComponent,
        canActivate: [LoginGuardGuard],
        loadChildren: './pages/pages.module#PagesModule'
    },
    {path: '**', component: NopagefoundComponent },
]; 

//path: '' -> ruta vacia
//path '**' -> rutas que no existan en la emplementacion de rutas

export const APP_ROUTES = RouterModule.forRoot(appRoutes, {useHash: true})