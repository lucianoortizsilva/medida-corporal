import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';
import { MedidaService } from './services/medida.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  userSocial: SocialUser;
  loggedIn: boolean;  

  constructor(private authService: AuthService,
              private medidaService: MedidaService,
              private router: Router,
              private changeDetectorRef:ChangeDetectorRef) {
  }

  ngOnInit() {}  
  
  
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
      this.authService.authState.subscribe((user) => {
        this.userSocial = user;
        if(this.userSocial !== null){
          this.loggedIn = true;
        }
      });
  }

  signOut(): void {
    this.authService.signOut();
  }

}