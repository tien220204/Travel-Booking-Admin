import {  Routes } from '@angular/router';
import { RegisterComponent } from './components/page/register/register.component';
import { LoginComponent } from './components/page/login/login.component';
import { DashboardComponent } from './components/page/dashboard/dashboard.component';


// import { RoomComponent } from './components/room/room.component';
// import { AddRoomComponent } from './components/room/add/add.component';


import { FlightComponent } from './components/page/flight/flight.component';


import { AirportComponent } from './components/page/airport/airport.component';
import { AddAirportComponent } from './components/page/airport/add/add.component';
import { EditAirportComponent } from './components/page/airport/edit/edit.component';


import { HotelComponent } from './components/page/hotel/hotel.component';

import { ReviewComponent } from './components/page/review/review.component';
import { AddReviewComponent } from './components/page/review/add/add.component';
import { EditReviewComponent } from './components/page/review/edit/edit.component';
import { RoomComponent } from './components/page/room/room.component';
import { AddRoomComponent } from './components/page/room/add/add.component';
import { EditRoomComponent } from './components/page/room/edit/edit.component';

import { RoomHotelQuantityComponent } from './components/page/room-hotel-quantity/room-hotel-quantity.component';
import { AddRoomHotelQuantityComponent } from './components/page/room-hotel-quantity/add/add.component';
import { EditRoomHotelQuantityComponent } from './components/page/room-hotel-quantity/edit/edit.component';
import { SiteComponent } from './components/page/site/site.component';
import { AddSiteComponent } from './components/page/site/add/add.component';
import { EditSiteComponent } from './components/page/site/edit/edit.component';
import { SiteTypeComponent } from './components/page/site-type/site-type.component';
import { AddSiteTypeComponent } from './components/page/site-type/add/add.component';
import { EditSiteTypeComponent } from './components/page/site-type/edit/edit.component';
import { TourComponent } from './components/page/tour/tour.component';
import { AddTourComponent } from './components/page/tour/add/add.component';
import { EditTourComponent } from './components/page/tour/edit/edit.component';
import { TourPersonQuantityComponent } from './components/page/tour-person-quantity/tour_person_quantity.component';
import { AddTourPersonQuantityComponent } from './components/page/tour-person-quantity/add/add.component';
import { EditTourPersonQuantityComponent } from './components/page/tour-person-quantity/edit/edit.component';
import { UserComponent } from './components/page/user/user.component';
import { AddUserComponent } from './components/page/user/add/add.component';
import { EditUserComponent } from './components/page/user/edit/edit.component';


import { BeachComponent } from './components/page/beach/beach.component';


export const routes: Routes = [
    // { path: '', component: LoginComponent },
    // { path: 'register', component: RegisterComponent },
    // { path: 'login', component: LoginComponent },

    { path: 'dashboard', component: DashboardComponent},

    // { path: 'room', component: RoomComponent },
    // { path: 'add-room', component: AddRoomComponent },

    //airport
    { path: 'airport', component: AirportComponent },
    { path: 'add-airport', component: AddAirportComponent },
    { path: 'edit-airport', component: EditAirportComponent },
   
    //beach

    //review
    { path: 'review', component: ReviewComponent },
    { path: 'add-review', component: AddReviewComponent },
    { path: 'edit-review', component: EditReviewComponent },

    //room
    { path: 'room', component: RoomComponent },
    { path: 'add-room', component: AddRoomComponent },
    { path: 'edit-room', component: EditRoomComponent },

    //room-hotel-quantity
    { path: 'room-hotel-quantity', component: RoomHotelQuantityComponent },
    { path: 'add-room-hotel-quantity', component: AddRoomHotelQuantityComponent },
    { path: 'edit-room-hotel-quantity', component: EditRoomHotelQuantityComponent },

    //site
    { path: 'site', component: SiteComponent },
    { path: 'add-site', component: AddSiteComponent },
    { path: 'edit-site', component: EditSiteComponent },

    //site-type
    { path: 'site-type', component: SiteTypeComponent },
    { path: 'add-site-type', component: AddSiteTypeComponent },
    { path: 'edit-site-type', component: EditSiteTypeComponent },

    //tour
    { path: 'tour', component: TourComponent },
    { path: 'add-tour', component: AddTourComponent },
    { path: 'edit-tour', component: EditTourComponent },

    //tour-pq
    { path: 'tour_person_quantity', component: TourPersonQuantityComponent },
    { path: 'add_tour_person_quantity', component: AddTourPersonQuantityComponent },
    { path: 'edit_tour_person_quantity', component: EditTourPersonQuantityComponent },

    //user
    { path: 'user', component: UserComponent },
    { path: 'add-user', component: AddUserComponent },
    { path: 'edit-user', component: EditUserComponent },
    
    { path: 'dashboard', component: DashboardComponent},
    { path: 'flight', component: FlightComponent},
    { path: 'hotel', component: HotelComponent},
    { path: 'beach', component: BeachComponent}
    
];
