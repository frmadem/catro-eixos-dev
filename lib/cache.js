const net = require("net");

const fs = require("fs");

/*
 * Se inicia
 *
 */

class Servidor {

    constructor(fProcesador, ruta){

        this.ruta = ruta;

        this.fProcesador = fProcesador;

        this.s = net.createServer((servidor) => {

            servidor.on("data", async (datos) => {

                await this.__procesarPeticion(datos, servidor);     

            })

            servidor.on("err", (err) => {
                this.__errorServidor(err);
             })

            servidor.on("close", (err) => {

            })

        })

        this.s.on("err", (err) => {

            this.__errorServidor(err);
        })

        this.s.listen(ruta);


    }

    salir(){

        this.s.close(() => {

            console.log("CACHE terminada")

        }) 

    }

    __procesarPeticion(peticion, servidor){

        return this.fProcesador(JSON.parse(peticion))

            .then((respuesta = {}) => {

                return new Promise((cumplida, falla) => {

                    servidor.write(
        
                        JSON.stringify(respuesta),

                        (err) => {
    
                            if(err) return falla(err)

                            else    return cumplida();
                        }
        

                    )

                })

            })

    }

    __errorServidor(err){

        console.log(`Servidor de datos: ${err}`);

        process.exit(1);

    }


}

class Cache{

    constructor(ruta){

        this.cache = {};
        this.ruta = ruta;

    }

    iniciar(){

        this.servidor = new Servidor(

            (peticion) => {

                return Promise.resolve(this.__procesar(peticion));
    
            },

 //           "./cache.sock",
            this.ruta


        )

    }

    __set({proceso, clave, valor}){

        if(!this.cache[proceso])
            this.cache[proceso] = {};

        this.cache[proceso][clave] = valor;

        this.__mensaje(`[${proceso}] SET -> ${clave} : ${valor}`);

        return {OK: 1}

    }

    __get({proceso, clave}){

        let respuesta = {};

        respuesta[clave] = undefined;

        if(!this.cache[proceso]) 
            respuesta[clave] = undefined;
        else                     
            respuesta[clave] = this.cache[proceso][clave]

        return respuesta;

    }

    __procesar(peticion){

        console.log(peticion)

        switch(peticion.comando){

            case "SALIR":
                this.servidor.salir();
                break;
            case "SET":
                return this.__set(peticion.datos);
            case "GET":
                return this.__get(peticion.datos)

        }

    }

    __mensaje(mensaje){

        fs.appendFile("./cache.log", `CACHE: ${mensaje}\n`, () => {


        })
         

    }

}


module.exports = Cache;
