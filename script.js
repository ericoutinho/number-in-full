/**
 * Classe para retornar um numero por extenso com exibição da moeda opcional.
 * @author Eric Coutinho <ericoutinho@gmail.com>
 * @package NumberInFull
 * @copyright 2021
 */
class NumberIF {

    units    = ['', 'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove'];
    ten      = ['dez', 'onze', 'doze', 'treze', 'quartorze', 'quinze', 'dessseis', 'dezessete', 'dezoito', 'dezenove'];
    dozens   = ['', '', 'vinte', 'trinta','quarenta','cinquenta','sessenta','setenta','oitenta','noventa'];
    hundreds = ['', 'cento', 'duzentos', 'trezentos', 'quatrocentos', 'quinhentos', 'seiscentos', 'setecentos', 'oitocentos','novecentos'];

    classSingular  = ['', 'mil', 'milhão', 'bilhão', 'trilhão', 'quatrilhão' ];
    classPlural    = ['', 'mil', 'milhões', 'bilhões', 'trilhões', 'quatrilhões' ];

    constructor(number, currency = false) {
        this.number = number;
        this.currency = currency;
    }

    /**
     * Faz a leitura do número armazenado no parâmetro 'number' e retorna ele por extenso
     * @package NumberInFull
     * @returns {string} Valor por extenso do número informado
     */
    readNumber() {
        let dc = this.number.split(".")[1];
        let it = this.number.split(".")[0];
        let result = [];
        
        let parts = it.split(",");
        
        for (let i = 0; i <= parts.length - 1; i++ ) {
            result.push(this.readPart( parts[i], ((parts.length - 1) - i) ));
        }

        let integer  = result.join(", ") + (this.currency ? " reais" : "");
        
        let decimals = this.readDecimals(dc) + (this.currency ? " centavos" : "");

        return integer + decimals;
    }

    /**
     * Faz a leitura da centena e retorna seu valor por extenso
     * @package NumberInFull
     * @param {string} part Centena a ser retornada
     * @param {number} classNumber Classe numérica da parte informada
     * @returns {string} Valor por extenso da centena informada
     */
    readPart(part, classNumber) {
        let number = this.padZeros(part);
        let c='', d='', u='', h='';
        
        if ( number[0] ==='1' && number[1] === '0' && number[2] === '0') {
            c = "cem"
        } else {
            c = parseInt(number[0]) > 0 ? this.hundreds[number[0]] : '';
        }
        
        if ( number[1] === '1' ) {
            d = this.ten[number[2]];
            u = '';
        } else {
            d = parseInt( number[1] ) > 0 ? this.dozens[number[1]] : '';
            u = parseInt( number[2] ) > 0 ? this.units[number[2]] : '';
        }

        if (parseInt(number) > 0) {
            h = (parseInt(number) > 1) ? this.classPlural[classNumber] : this.classSingular[classNumber];
        }

        return c + (((c && d) || (c && u)) ? ' e ' : '') + d + (d && u ? ' e ' : '') + u + (h ? ` ${h}` : '');
    }

    /**
     * Retorna o valor do decimal do número
     * @package NumberInFull
     * @param {string} decimal O valor decimal a ser lido
     * @returns {string} O valor por extenso do decimal informado
     */
    readDecimals(decimal) {
        return  (parseInt(decimal) > 0) ? ` e ${this.readPart(decimal)}` : '';
    }

    /**
     * Preenche com zeros a esquerda caso a centena tenha menos de 3 casas
     * @package NumberInFull
     * @param {string} toPadNumber Valor numérico a ser acrescido de zeros
     * @returns {string} O valor acrescido
     */
    padZeros(toPadNumber){
        return (`000${toPadNumber}`).slice(-3);
    }
}

let number = "111,530.35";
console.warn(number);


let n = new NumberIF(number, true);
console.log(n.readNumber());