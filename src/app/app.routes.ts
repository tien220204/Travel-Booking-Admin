import {  Routes } from '@angular/router';
import { RegisterComponent } from './components/page/register/register.component';
import { LoginComponent } from './components/page/login/login.component';
import { DashboardComponent } from './components/page/dashboard/dashboard.component';


import { RoomComponent } from './components/room/room.component';
import { AddRoomComponent } from './components/room/add/add.component';


import { FlightComponent } from './components/page/flight/flight.component';
import { ReviewComponent } from './components/page/review/review.component';
import { AirportComponent } from './components/page/airport/airport.component';
import { AddAirportComponent } from './components/page/airport/add/add.component';
import { EditAirportComponent } from './components/page/airport/edit/edit.component';
import { BeachComponent } from './components/page/beach/beach.component';
import { AddBeachComponent } from './components/page/beach/add/add.component';
import { EditBeachComponent } from './components/page/beach/edit/edit.component';

export const routes: Routes = [
    // { path: '', component: LoginComponent },
    // { path: 'register', component: RegisterComponent },
    // { path: 'login', component: LoginComponent },

    { path: 'dashboard', component: DashboardComponent},
    { path: 'review', component: ReviewComponent },
    { path: 'room', component: RoomComponent },
    { path: 'add-room', component: AddRoomComponent },

    //airport
    { path: 'airport', component: AirportComponent },
    { path: 'add-airport', component: AddAirportComponent },
    { path: 'edit-airport', component: EditAirportComponent },
   
    //beach
    { path: 'beach', component: BeachComponent },
    { path: 'add-beach', component: AddBeachComponent },
    { path: 'edit-beach', component: EditBeachComponent },

    { path: 'dashboard', component: DashboardComponent},
    { path: 'flight', component: FlightComponent}
    
];
