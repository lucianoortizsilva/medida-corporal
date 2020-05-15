export enum Pagina {
    medida_progresso = 'medida_progresso',
    medida_cadastro = 'medida_cadastro', 
    medida_atual = 'medida_atual'
}

export interface Medida { 
    dtCriacao: Date;
    parametros: [{codigo: number, descricao: string; valor: number;}]    
}

export class FiltroMedida { 
    codigo: number;
    descricao: string;
}