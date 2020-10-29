import { RouterModule, Routes } from '@angular/router';
import { EditorialComponent } from './components/editorial/editorial.component';
import { LibroComponent } from './components/libro/libro.component';
import { HomeComponent } from './components/shared/home/home.component';
import { AuthGuard } from './guardian';
import { LoginComponent } from './components/login/login.component';

const APP_ROUTES: Routes = [
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
    { path: 'editorial', component: EditorialComponent , canActivate: [AuthGuard]},
    { path: 'libro', component: LibroComponent, canActivate: [AuthGuard]},
    { path: '', pathMatch:'full', redirectTo: 'home', canActivate: [AuthGuard]},
    { path: 'login', component: LoginComponent },
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);