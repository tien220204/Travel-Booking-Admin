import { Routes } from '@angular/router';
import { RegisterComponent } from './components/page/register/register.component';
import { LoginComponent } from './components/page/login/login.component';
import { DashboardComponent } from './components/page/dashboard/dashboard.component';
import { FlightComponent } from './components/page/flight/flight.component';

export const routes: Routes = [
    // { path: '', component: LoginComponent },
    // { path: 'register', component: RegisterComponent },
    // { path: 'login', component: LoginComponent },
   
    { path: 'dashboard', component: DashboardComponent},
    { path: 'flight', component: FlightComponent}
    
];
