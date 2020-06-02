import { Component, OnInit } from '@angular/core';
import { AuthService } from 'angularx-social-login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-perfil',
  templateUrl: './page-perfil.component.html',
  styleUrls: ['./page-perfil.component.scss']
})
export class PagePerfilComponent implements OnInit {

  autenticado = false;

  constructor(private authService: AuthService, private router: Router) { 
    this.authService.authState.subscribe(data => {
      if (data === null) {
        this.router.navigate(['/login']);
      } else {
        this.autenticado = true;
      }
    });  
  }

  ngOnInit(): void {}

}