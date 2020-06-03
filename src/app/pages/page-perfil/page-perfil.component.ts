import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService, SocialUser } from 'angularx-social-login';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MedidaService } from 'src/app/services/medida.service';
import { HttpErrorResponse, HttpResponseBase, HttpResponse } from '@angular/common/http';
import { Usuario } from 'src/app/model';

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
              private medidaService: MedidaService) {

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

      const usuario = new Usuario();
      usuario.altura = this.form.value.altura / 100;
      usuario.email = this.form.value.email;
      usuario.sexo = this.form.value.sexo;
      const body = JSON.stringify(usuario);

      this.medidaService.saveUsuario(body).subscribe( data => {
        if (data !== null) {
          this.router.navigate(['/home']);
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
