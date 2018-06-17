const {Proceso} = require("catro-eixos-js");

module.exports = class extends Proceso {

    __r(){

        return [

            "__a",
            "__b",
            "__c"

        ]

    }

    __a(){

        return this.UtilesFS.listarDirectorio("/proc")

                .then((entradas) => {
    
                    this.a("entradas", entradas)                

                })

    }

    __b(){

        console.log(this.a("entradas"))
    
        this.a("filtrados", this.a("entradas").filter(e  => e.match(/^\d+$/)))

    }

    __c(){

        console.log(this.a("filtrados"))

    }

}
