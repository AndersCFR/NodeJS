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
                //Datos
                const datosLugarSeleccionado = lugares.find( l => l.id === idLugarSeleccionado);
                const {nombre, latitud, longitud} = datosLugarSeleccionado;
                console.log('\n\tInformación ciudad'.green);
                console.log('Ciudad: ', nombre);
                console.log('Latitud: ', latitud);
                console.log('Longitud: ', longitud);
                console.log('Temperatura: ',);
                console.log('Temperatura mínima: ',);
                console.log('Temperatura máxima: ',);
                break;
        }
        await pausa();
    }while(opt !== 0);
}
main();