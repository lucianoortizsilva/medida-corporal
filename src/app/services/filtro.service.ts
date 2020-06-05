import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FiltroService {

  public quantidadeRegistrosBehaviorSubject = new BehaviorSubject(6);
  public codigoMedidaBehaviorSubject = new BehaviorSubject(0);
  public responsiveBehaviorSubject = new BehaviorSubject({isMobile:false, isTablet:false, isDesktop: false});

  constructor() { }

  setQuantidadeRegistrosParaVisualizar(quantidade: number) {
    this.quantidadeRegistrosBehaviorSubject.next(quantidade);
  }

  setMedidaParaVisualizar(codigo: number){
    this.codigoMedidaBehaviorSubject.next(codigo);
  }

  setResponsive(obj: any){
    this.responsiveBehaviorSubject.next(obj);
  }
  
}
