const Decorador = require("./decorador.js");

const CacheCtl = require("./cache_ctl.js");

module.exports = function(proceso, opciones = {}){

    //iniciamos la cache
    const cache_ctl = new CacheCtl()

    return cache_ctl.arrancar(opciones.ruta_cache)
    
        .then((cache_ctl) => {

            return __decorarProceso(proceso, opciones, cache_ctl)

        })

        .then(() => {

            //evitamos los cacheados
            return __planificarProceso(proceso, opciones, cache_ctl);

        }).then(() => {

            return proceso;

        })

}

function __planificarProceso(proceso, opciones, cache_ctl){

    const {cache} = opciones;

    const alijo = {};

    Object.values(cache).forEach((vv) => {

        vv.forEach(v => alijo[v] = true)

    })

    const valores = {};

    //buscamos los datos
    return Promise.all(

        Object.keys(alijo).map( (k)  => {

            return cache_ctl.GET(opciones.nombre, k)

                .then((v) => {

                    valores[k] = v;

                })

        })

    ).then(() => {

        //inflamos el alijo

        Object.keys(valores).forEach(k => proceso.alijo[k] = valores[k]);


    }).then(() => {

        //parcheamos los pasos
        const excluir = [];

        Object.keys(cache).forEach((paso) => {

            //miramos si tiene todo cacheado
            const cacheado = cache[paso].filter((clave) => {

                return valores[clave] == undefined

            }).length == 0

            if(cacheado) 
                excluir.push(paso);
        })

        return excluir;
        
    }).then((excluir) => {

        return __decorarPasoR(proceso, excluir);

    })

}


function __decorarProceso(proceso, opciones, cache_ctl){

    __decorarAlijo(proceso, opciones.nombre, cache_ctl);

}

function __decorarAlijo(proceso, nombre, cache_ctl){

    Decorador(proceso, "a", function(k, v){

        if(v == undefined){
    
            return cache_ctl.GET(nombre, k)
        }
        else{

            return cache_ctl.SET(nombre, k, v)
        }


    })
}

function __decorarPasoR(proceso, pasosCacheados){

    console.log(pasosCacheados)

    const pasos = proceso.__r();

    proceso["__r"] = function(){

        return pasos.filter((paso) => {
    
            return pasosCacheados.indexOf(paso) == -1

        })

    }
    

}
