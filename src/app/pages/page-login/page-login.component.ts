import { Component, OnInit } from '@angular/core';
import { AuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';
import { MedidaService } from '../../services/medida.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-page-login',
  templateUrl: './page-login.component.html',
  styleUrls: ['./page-login.component.scss']
})
export class PageLoginComponent implements OnInit {

  user: SocialUser;



  constructor(private authService: AuthService,
              private medidaService: MedidaService,
              private router: Router) {
  }



  ngOnInit() {
    this.authService.authState.subscribe(data => {
      if (data === null) {
        this.router.navigate(['']);
      }
    });
  }



  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);

    this.authService.authState.subscribe((user) => {
        this.user = user;
        if (this.user !== null) {
          this.medidaService.getUsuario(user.email).subscribe(
            data => {
              if (data !== null) {
                this.router.navigate(['/home']);
              }
            },
            (err = HttpErrorResponse) => {
              if (err.status === 404) {
                  this.router.navigate(['/perfil']);
              } else {
                  this.router.navigate(['/erro500']);
              }
            });
        }
      }, err => {
        console.error(err);
      });
  }

}

