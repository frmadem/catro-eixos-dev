const blessed = require("blessed");

//module.exports = class {

class Pantalla {

    constructor(){

        this.pantalla = false;
        
        this.cajones_texto = {};

        this.eventos = {

            SALIR: () => {
                process.exit(0);
            }

        }

    }

    iniciar(){
    
        this.pantalla = blessed.screen({

            smartCSR: true

        });

        this.pantalla.key(["escape", "q", "C-c"], () => {

            this.__evento("SALIR");

        })

    }

    set titulo(nombre){

        this.pantalla.title = nombre;
    }

    agregarPrompt(nombre, opciones = {}){

        this.cajones_texto[nombre] = blessed.box(

            opciones
        )

        this.pantalla.append(this.cajones_texto[nombre]);

        this.pantalla.render();


    }

    __evento(nombre){

        this.eventos[nombre]();

    }

}

const p = new Pantalla();

p.iniciar();

p.titulo = "Foo"

p.agregarPrompt("entrada", {

    width: "100%",

    height: "10%",

    top: "90%",

    border: {
       type: "line"
    },

    style: {
        border: {
            fg: "green"
        }
    },

    content: ">",
    


})


