import {  Routes } from '@angular/router';
import { RegisterComponent } from './components/page/register/register.component';
import { LoginComponent } from './components/page/login/login.component';
import { DashboardComponent } from './components/page/dashboard/dashboard.component';
import { ReviewComponent } from './components/review/review.component';
import { RoomComponent } from './components/room/room.component';
import { AddRoomComponent } from './components/room/add/add.component';


export const routes: Routes = [
    // { path: '', component: LoginComponent },
    // { path: 'register', component: RegisterComponent },
    // { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent},
    { path: 'review', component: ReviewComponent },
    { path: 'room', component: RoomComponent },
    { path: 'add-room', component: AddRoomComponent },

];
