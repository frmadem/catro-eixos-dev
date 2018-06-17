module.exports = function(cache, proceso) {

    let f = proceso.a;

    proceso.a = function(...args){

        if(args.length > 1){

            cache[args[0]] = args[1]

        }

        return f.apply(proceso, args)

    }

    f = proceso.ejecutar; 

    proceso.ejecutar = function(...args){

        console.log("ME llamas")

        return f.apply(proceso, args).catch(() => {

            process.exit(0);

        })
        
    }

    return proceso;

}
