export enum Pagina {
    medida_progresso = 'medida_progresso',
    medida_cadastro = 'medida_cadastro', 
    medida_atual = 'medida_atual'
}

export enum MedidaEnum {
    PESO = 1,
    TORAX = 2,
    CINTURA = 3,
    QUADRIL = 4,
    COXA_E = 5,
    COXA_D = 6,
    PANTURRILHA_E = 7,
    PANTURRILHA_D = 8,
    BICEPS_E = 9,
    BICEPS_D = 10,
    ANTEBRACO_E = 11,
    ANTEBRACO_D = 12,
    PESCOCO = 13
}

export interface Medida { 
    dtCriacao: Date;
    codigo: number; 
    descricao: string; 
    valor: number;
}

export class FiltroMedida { 
    codigo: number;
    descricao: string;
}