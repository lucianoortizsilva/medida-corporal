import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FiltroGrafico } from '../model';

@Injectable({
  providedIn: 'root'
})
export class FiltroService {

  
  public filtroGraficoBehaviorSubject = new BehaviorSubject(new FiltroGrafico());
  public responsiveBehaviorSubject = new BehaviorSubject({isMobile:false, isTablet:false, isDesktop: false});

  constructor() { }

  setResponsive(obj: any){
    this.responsiveBehaviorSubject.next(obj);
  }

  setFiltroGrafico(filtro: FiltroGrafico){
    this.filtroGraficoBehaviorSubject.next(filtro);
  }

}