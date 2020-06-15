import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-notificacao',
  templateUrl: './notificacao.component.html',
  styleUrls: ['./notificacao.component.scss']
})
export class NotificacaoComponent implements OnInit {

  
  /**
   * 
   * success, 
   * danger,
   * warning,
   * info
   * 
   */
  @Input() tipo: string;
  @Input() mensagem: string;
  @Output() fecharMensagemEventEmitter = new EventEmitter<boolean>(false);

  constructor() { }

  ngOnInit(): void {}

  fechar(): void {
    this.fecharMensagemEventEmitter.emit(true);
  }

}