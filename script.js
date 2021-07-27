const units    = ['', 'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove'];
const ten      = ['dez', 'onze', 'doze', 'treze', 'quartorze', 'quinze', 'dessseis', 'dezessete', 'dezoito', 'dezenove'];
const dozens   = ['', '', 'vinte', 'trinta','quarenta','cinquenta','sessenta','setenta','oitenta','noventa'];
const hundreds = ['', 'cento', 'duzentos', 'trezentos', 'quatrocentos', 'quinhentos', 'seiscentos', 'setecentos', 'oitocentos','novecentos'];

const classSingular  = ['', 'mil', 'milhão', 'bilhão', 'trilhão', 'quatrilhão' ];
const classPlural    = ['', 'mil', 'milhões', 'bilhões', 'trilhões', 'quatrilhões'];

/**
 * Faz a leitura do numero por extenso
 * @param {string} number Numero a ser lido por extenso
 * @param {boolean} currency Caso desejar acrescenta a moeda
 * @returns {string}
 */
function readNumber(number, currency = false) {
    
    let dc = number.split(".")[1];
    let it = number.split(".")[0];
    let result = [];
    
    let parts = it.split(",");
    
    for (let i = 0; i <= parts.length - 1; i++ ) {
         result.push(readPart( parts[i], ((parts.length - 1) - i) ));
    }

    let integer  = result.join(", ") + (currency ? " reais" : "");
    let decimals = readDecimals(dc) + (currency ? " centavos" : "");

    return integer + decimals;
}

/**
 * Faz a leitura do decimal
 * @param {string} decimal Decimal a ser lido por extenso
 * @returns {string}
 */
function readDecimals(decimal) {
    return  (parseInt(decimal) > 0) ? ` e ${readPart(decimal)}` : '';
}


/**
 * Lê por extenso a centena da classe informada
 * @param {string} part A centena a ser lida
 * @param {string} classNumber A classe da centena a ser lida
 * @returns {string}
 */
function readPart(part, classNumber) {
    let number = padZeros(part);
    let c='', d='', u='', h='';
    
    if ( number[1] === '0' && number[2] === '0') {
        c = "cem"
    } else {
        c = parseInt(number[0]) > 0 ? hundreds[number[0]] : '';
    }
    
    if ( number[1] === '1' ) {
        d = ten[number[2]];
        u = '';
    } else {
        d = parseInt( number[1] ) > 0 ? dozens[number[1]] : '';
        u = parseInt( number[2] ) > 0 ? units[number[2]] : '';
    }

    if (parseInt(number) > 0) {
        h = (parseInt(number) > 1) ? classPlural[classNumber] : classSingular[classNumber];
    }

    return c + (((c && d) || (c && u)) ? ' e ' : '') + d + (d && u ? ' e ' : '') + u + (h ? ` ${h}` : '');
}


/**
 * Preencher com zeros a esquerda caso o número
 * seja menor que 3 casas
 * @param {string} number O número a ser ascrescido de zeros
 * @returns {string}
 */
function padZeros(number) {
    return (`000${number}`).slice(-3);
}


let number = "1,503,252,125,023.35";
console.warn(number);


console.log(readNumber(number, true));