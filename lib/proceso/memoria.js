//en esta estructura se guarda toda la memoria del proceso

const {Map, fromJS} = require("immutable");

module.exports = {

    iniciar(estado = Map({}){

        return estado.merge(fromJS({

            procesos: {}

        }))

    },

    nuevoProceso(estado, proceso){

        

    },

}


function crearProceso(proceso){

    return fromJS({

        nombre: 


    })

}
