import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';
import { AccountSettigsComponent } from './account-settigs/account-settigs.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardGuard } from '../services/guards/login-guard.guard';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { AdminGuard } from '../services/guards/admin.guard';

const pagesRoutes: Routes = [
    {
        path: '', 
        component: PagesComponent,
        //con canActivate protegemos las rutas
        canActivate: [ LoginGuardGuard ],
         children: [
            {path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard' } },
            {path: 'progress', component: ProgressComponent, data: { titulo: 'Progress' } },
            {path: 'graficas1', component: Graficas1Component, data: { titulo: 'Gráficas' } },
            {path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' } },
            {path: 'rxjs', component: RxjsComponent, data: { titulo: 'Rxjs' } },
            {path: 'account-settigs', component: AccountSettigsComponent, data: { titulo: 'Ajustes del tema' } },
            {path: 'perfil', component: ProfileComponent, data: { titulo: 'Perfil de usuario' } },
            {path: 'busqueda/:termino', component: BusquedaComponent, data: { titulo: 'Buscador' } },
            //Mantenimientos
            {
                path: 'usuarios', 
                component: UsuariosComponent, 
                canActivate: [AdminGuard],
                data: { titulo: 'Mantenimiento de usuarios' } 
            },
            {path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Mantenimiento de hospitales' } },
            {path: 'medicos', component: MedicosComponent, data: { titulo: 'Mantenimiento de médicos' } },
            {path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Actualizar médico' } },
            {path: '', redirectTo: '/dashboard', pathMatch: 'full' },        
        ] 
    },
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);