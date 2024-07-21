import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { SidebarComponent } from './components/layout/sidebar/sidebar.component';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';

import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { MessageService } from 'primeng/api';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
     RouterOutlet,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,

    CommonModule,
    RouterModule,
    RouterLink,

    HttpClientModule

  ],
  providers: [MessageService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Travel-Admin';
}
