import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService, SocialUser } from 'angularx-social-login';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MedidaService } from 'src/app/services/medida.service';
import { HttpErrorResponse, HttpResponseBase, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-page-perfil',
  templateUrl: './page-perfil.component.html',
  styleUrls: ['./page-perfil.component.scss']
})
export class PagePerfilComponent implements OnInit {

  socialUser: SocialUser;
  autenticado = false;
  form: FormGroup;

  constructor(private authService: AuthService,
              private router: Router,
              private formBuilder: FormBuilder,
              private medidaService: MedidaService,
              private changeDetectorRef:ChangeDetectorRef) {

    this.authService.authState.subscribe(data => {
      if (data === null) {
        this.router.navigate(['/login']);
      } else {
        this.socialUser = data;
        this.autenticado = true;
        this.loadForm(this.socialUser.email);
      }
    });
  }

  ngOnInit(): void {}

  private loadForm(email: string): void {
    this.form = this.formBuilder.group({
      sexo: new FormControl('M'),
      email: [email],
      altura: [null],
    });
  }



  save(): void {
    if (this.form.valid) {
      const body = JSON.stringify(this.form.value);

      this.medidaService.saveUsuario(body).subscribe( (httpResponseBase: HttpResponse) => {

        console.log('data.status: ', httpResponseBase);
        console.log('data.status: ', httpResponseBase.status);

        if (httpResponseBase.status === 201) {

          this.router.navigate(['/home']);
          this.changeDetectorRef.detectChanges();
        }
      }, (err: HttpErrorResponse) => {
        /**
         * TODO: Adicionar mensagem de erro p\ usuário
         */
        console.log('Ocorreu um erro no servidor: ', err);
      });
    }
  }

}
