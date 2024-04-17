import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "./services/auth.service";
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'covoiturages';
  fullName: string = '';
  isLoggedIn = false;
  userId: string = '';

  constructor(private router: Router, public authService: AuthService, public userService: UserService) {
    this.authService.isLoggedIn.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      if (isLoggedIn) {
        const userId = sessionStorage.getItem('id'); 
        if (userId) {
          this.userService.getUser(userId).subscribe(user => {
            this.fullName = user.fullName;
            console.log("this.fullName",this.fullName);
          });
        }
      } else {
        this.fullName = '';
      }
    });
  }

  logOut() {
    sessionStorage.clear();
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }
}