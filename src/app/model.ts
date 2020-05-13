export enum Pagina {
    medida_progresso = 'medida_progresso',
    medida_cadastro = 'medida_cadastro', 
    medida_atual = 'medida_atual'
}

export class Medida { 
    codigo: number;
    dtCriacao: Date;
    descricao: string;
    valor: number;
}

export class FiltroMedida { 
    codigo: number;
    descricao: string;
}