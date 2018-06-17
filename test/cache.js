const Dev = require("../lib/dev.js");

const ProcesoTest = require("./fixtures/proceso_a.js");

const {Tarea} = require("catro-eixos-js");

describe("Cache de procesos", function(){

    it("Permite poner un proceso en dev", function(){

        return Dev(new ProcesoTest(

            new Tarea("foo", {

            })

            ), 

            {

                nombre: "proceso_test",

                ruta_cache: "/tmp/cache.sock",

                cache: {

                    "__a": ["entradas"],
                    "__b": ["entradas", "filtrados"]

                }
            }
        
        ).then((proceso) => {

            return proceso.ejecutar()

        })

    })

})
