module.exports = function(objeto, propiedad, sobreescribir){

    const original = objeto[propiedad];

    objeto[propiedad] = function(...args){

        let r = sobreescribir(...args);

        if(original) return original.apply(objeto, args)

        else         return r;
    

    }


}


