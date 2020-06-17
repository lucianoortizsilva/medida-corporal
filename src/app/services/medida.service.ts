import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Medida, Usuario } from '../model';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MedidaService {


  public ultimaMedidaBehaviorSubject = new BehaviorSubject(null);


  constructor(private http: HttpClient) { }


  setUltimaMedida(m: Medida) {
    this.ultimaMedidaBehaviorSubject.next(m);
  }



  getMedidas(email: string): Observable<Medida[]> {
    const url = environment.medidasAPI + '/' + email;
    return this.http.get<Medida[]>(url, {responseType: 'json'});
  }




  getMedidaAtual(email: string): Observable<Medida> {
    const url = environment.medidasAPI + '/' + email + '/atual';
    return this.http.get<Medida>(url, {responseType: 'json'});
  }




  getUsuario(email: string): Observable<Usuario> {
    const url = environment.usuariosAPI + '/' + email;
    return this.http.get<Usuario>(url, {responseType: 'json'});
  }



  saveMedida(body: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    const url = environment.medidasAPI;
    return this.http.post(url, body, httpOptions);
  }



  saveUsuario(body: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    const url = environment.usuariosAPI;
    return this.http.post(url, body, httpOptions);
  }



  deletarMedida(id: string) {
    const url = environment.medidasAPI + '/' + id;
    return this.http.delete(url, {responseType: 'json'});
  }

}