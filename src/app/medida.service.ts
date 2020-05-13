import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { catchError, retry } from 'rxjs/operators';
import { Medida } from './model';

@Injectable({
  providedIn: 'root'
})
export class MedidaService {

  constructor(private http: HttpClient) { }

  getMedidas(): Observable<Medida[]> {
    const url = 'http://localhost:3001/medidas';
    return this.http.get<Medida[]>(url);
  }
  
  cadastrar(){
    
  }

}