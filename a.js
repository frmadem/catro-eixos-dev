const {Tarea, Proceso} = require("catro-eixos-js");

const Decorador = require("./lib/decorador.js");

class A extends Proceso{

    __r(){

        return [

            "__a",
            "__aIncrementar"

        ]

    }

    __a(){

        this.cache("n", 1);

        this.a("n", 1)
    }

    

}

class B extends Proceso{

    __r(){

        return [

            "__a",

        ]

    }

    __a(){

        this.cache("n", 1);

        this.a("n", 1)

    }
}

Decorador(Proceso.prototype, "cache", function(k, v){

    console.log("Llamar a cache")
})

new B(new Tarea("foo")).ejecutar();
