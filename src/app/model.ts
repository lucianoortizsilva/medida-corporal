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
    COXA = 5,
    PANTURRILHA_E = 7,
    PANTURRILHA_D = 8,
    BICEPS = 9,
    ANTEBRACO = 10,
    PESCOCO = 13
}

export class Medida {
    dtCriacao: Date;
    peso: number;
    pescoco: number;
    torax: number;
    cintura: number;
    quadril: number;
    bicepsE: number;
    bicepsD: number;
    antebracoE: number;
    antebracoD: number;
    coxaE: number;
    coxaD: number;
    panturrilhaE: number;
    panturrilhaD: number;
    usuario: Usuario;
}

export class FiltroMedida {
    codigo: number;
    descricao: string;
}

export class Usuario {
    email: string;
    sexo: string;
    altura: number;
}
