require('dotenv').config()

const {leerInput, inquirerMenu, pausa, listarLugares} = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");

const main = async() => {
    const busquedas = new Busquedas();
    let opt;
    do{
        opt = await inquirerMenu();
        switch (opt){
            case 1:
                // Mostrar mensaje
                const terminoBusqueda = await leerInput('Ingresa el lugar:');
                // Buscar lugares
                const lugares = await busquedas.ciudad(terminoBusqueda);
                // Seleccionar lugar
                const idLugarSeleccionado = await listarLugares(lugares);
                console.log(idLugarSeleccionado);

                //Datos Localización
                const datosLugarSeleccionado = lugares.find( l => l.id === idLugarSeleccionado);
                const {nombre, latitud, longitud} = datosLugarSeleccionado;

                //Datos clima
                const datosClimaLugar = await busquedas.climaLugar(latitud, longitud);
               const {desc, min, max, temp} = datosClimaLugar;
                console.clear();
                console.log('\n\tInformación ciudad'.green);
                console.log('Ciudad: '.yellow, nombre);
                console.log('Latitud: '.yellow, latitud);
                console.log('Longitud: '.yellow, longitud);
                console.log('Temperatura: '.blue,temp);
                console.log('Temperatura mínima: '.blue,min);
                console.log('Temperatura máxima: '.blue,max);
                console.log('Descripción:'.green,desc)
                break;
        }
        await pausa();
    }while(opt !== 0);
}
main();