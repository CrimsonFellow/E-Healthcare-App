import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule],
  templateUrl:'./app.component.html' ,
  styleUrls: ['./app.component.css'] ,
})
export class AppComponent {
  title = 'healthcare-app';
  showAdminHeading = false;  

  constructor(private router: Router) {
    
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
       
        this.showAdminHeading = this.router.url.startsWith('/admin');
      }
    });
  }
}


