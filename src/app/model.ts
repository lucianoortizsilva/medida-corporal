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
    PANTURRILHA = 6,
    BICEPS = 7,
    ANTEBRACO = 8,
    PESCOCO = 9
}

export class Medida {
    _id: string;
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

export class FiltroGrafico {
    opcaoQuantidadeRegistros: number;
    opcaoMedidaSelecionada: number;
}
