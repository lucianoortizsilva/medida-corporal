import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Medida } from './model';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MedidaService {

  constructor(private http: HttpClient) { }


  getMedidas(): Observable<Medida[]> {
    const url = environment.medidasAPI;
    return this.http.get<Medida[]>(url, {responseType: 'json'});
  }




  getMedidaAtual(email: string): Observable<Medida> {
    const url = environment.medidasAPI + '/' + email + '/atual';
    return this.http.get<Medida>(url, {responseType: 'json'});
  }




  save(body: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    const url = environment.medidasAPI;
    return this.http.post(url, body, httpOptions);
  }

}