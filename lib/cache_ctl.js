const {spawn} = require("child_process");

const net = require("net");
const fs = require("fs");
let RUTA = "cache.sock";

class CacheCTL {

    arrancar(ruta){

        RUTA = ruta || RUTA;

        if(fs.existsSync(RUTA)){
            return Promise.resolve(this);
        }
        else{

            return new Promise((cumplida, falla) => {

                spawn(

                    __dirname + "/../bin/lanzar_cache.js",

                    [RUTA],

                    {
                        detached: true ,

                        stdio: "ignore",
                    }

                ).unref();


                setTimeout(() => {

                    cumplida(this);

                }, 1000)
            })

        }


    }

    detener(){

        return this.enviar({comando: "SALIR"})

    }

    GET(nombre, clave){

        return this.enviar({

            comando: "GET",
        
            datos: {

                proceso: nombre,

                clave

            }

        }).then((r) => {

            if(r)   return r[clave];

            else    return undefined;

        })

    }

    SET(nombre, clave, valor){

        return this.enviar({
        
            comando: "SET",

            datos: {

                proceso: nombre,

                clave,

                valor

            }

        })


    }

    enviar(peticion){
        
        return this.__conexion()

            .then((conexion) => {

                return new Promise((cumplida, falla) => {

                    conexion.write(JSON.stringify(peticion), () => {

                        cumplida(conexion);

                    })

                })

            }).then((conexion) => {

                return this.__esperarRespuesta(conexion);

            }).then((r) => {

                return r;

            })

    }

    __esperarRespuesta(conexion){

        return new Promise((cumplida, falla) => {

           conexion.on("data", (respuesta) => {

                conexion.destroy();

                conexion.on("close", () => {

                   return cumplida(JSON.parse(respuesta));

                })

           })

        })            

    }

    __conexion(){

        return new Promise((cumplida, falla) => {

            let c = net.createConnection(RUTA)

            c.on("connect", () => {

                cumplida(c);

            })

        })
    }

}

module.exports = CacheCTL;

//let Cache = new CacheCTL();
//
//Cache.arrancar().then(() => {
//
//    return Cache.enviar({
//
//        comando: "SET",
//
//        datos: {
//
//            proceso: "lol",
//
//            clave: "foo",
//
//            valor: 1
//
//        }
//
//    })
//
//}).then(() => {
//
//    return Cache.enviar({
//
//        comando: "GET",
//
//        datos: {
//
//            proceso: "lol",
//            
//            clave: "foo"
//
//        }
//
//    })
//
//}).then((respuesta) => {
//
//    console.log(respuesta)
//
//}).then(() => {
//
//    return Cache.detener();
//
//})
//
        

