import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { authGuard } from './services/guard/auth.guard';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes =
    [
        { path: 'login', component: LoginComponent },
        { path: 'register', component: RegisterComponent },
        { path: 'home', component: HomeComponent, canActivate: [authGuard] },
        { path: '', redirectTo: '/home', pathMatch: 'full' }
    ];