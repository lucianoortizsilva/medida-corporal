import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Medida } from './model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedidaService {

  constructor(private http: HttpClient) { }

  
  getMedidas(): Observable<Medida[]> {
    const url = 'http://localhost:3001/medidas';
    return this.http.get<Medida[]>(url, {responseType: 'json'});
  }




  getMedidasByID(codigo: number): Observable<Medida[]> {
    const url = 'http://localhost:3001/medidas/' + codigo;
    return this.http.get<Medida[]>(url, {responseType: 'json'});
  }


}