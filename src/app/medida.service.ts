import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FiltroMedida } from './model';

@Injectable({
  providedIn: 'root'
})
export class MedidaService {

  constructor(private http: HttpClient) { }


  getMedidas() {
    const url = 'http://localhost:3001/medidas';
    return this.http.get(url);
  }




  getMedidasBy(filtro: FiltroMedida) {
    const query = "{parametros: { codigo:" + filtro.codigo + "}}";
    const url = 'http://localhost:3001/medidas/' + query;
    return this.http.get(url);
  }



  cadastrar(){}

}