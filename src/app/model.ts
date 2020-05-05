export enum Pagina {
    medida_progresso = 'medida_progresso',
    medida_cadastro = 'medida_cadastro', 
    medida_atual = 'medida_atual'
}

export class Medida {
 
    dtCriacao: Date;
    parametros: [{descricao: string, valor: number}]

}