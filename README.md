# CatroEixosDev

Sistema de desarrollo para catro-eixos-js. 


## Cache de pasos

Crea un proceso independiente que mantiene valores intermedios (de alijo) de forma que se pueden recuperar entre ejecuciones. 

Declarándolos como cache, en caso de haber sido introducidos, evitan que el paso no se ejecute. 



```js

const {Proceso, Tarea} = require("catro-eixos-js");

const {DevProceso} = require("catro-eixos-dev");

class A extends Proceso{


    __a(){ // si "valor" está cacheado, __a  no se ejecutará

        //paso lento...

        this.a("valor", {});

    }



}


//depuramos una instancia

DevProceso(

    new A(
        
        new Tarea("test", {})

    ),

    {
        cache: {

            "__a": ["valor"] //__a no se ejecuta si "valor" está cacheado

        }

    }

).ejecutar()


```
