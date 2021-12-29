const axios = require('axios');
// axios es la librerís que me permite hacer las operaciones a los endpoints

class Busquedas {

    historial = ['Madrid','Barcelona', 'San Jose']
    constructor(){

    }

    // parametros para el String de petición del get
    get paramsMapbox() {
        return{
        'access_token': process.env.MAPBOX_KEY,
        'limit': 5,
        'language': 'es'
        }
    }

    async ciudad(lugar = ''){
        //petición http

        try{
            //  creación de la instancia a partir del string recibido
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ lugar }.json`,
                params: this.paramsMapbox
            });

            // se realiza la petición get al endpoint
            const resp = await instance.get();
            //console.log(resp.data.features);
            return resp.data.features.map( lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                longitud: lugar.center[0],
                latitud: lugar.center[1],
            })
            )
        }catch (error){
            return [];
        }

    }

}

module.exports = Busquedas;