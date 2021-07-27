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

    readDecimals(decimal) {
        return  (parseInt(decimal) > 0) ? ` e ${this.readPart(decimal)}` : '';
    }

    padZeros(toPadNumber){
        return (`000${toPadNumber}`).slice(-3);
    }
}

let number = "111,530.35";
console.warn(number);


let n = new NumberIF(number, true);
console.log(n.readNumber());