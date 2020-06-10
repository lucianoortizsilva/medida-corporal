import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-erro404',
  templateUrl: './page-erro404.component.html',
  styleUrls: ['./page-erro404.component.scss']
})
export class PageErro404Component implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.redirectToLogin();
  }



  private redirectToLogin(): void {
    let contador = 0;
    const timer = setInterval(() => {
      if (contador > 0) {
        clearInterval(timer);
        this.router.navigate(['/login']);
      }else{
        contador++;
      }
    }, 4000);
  }

}
