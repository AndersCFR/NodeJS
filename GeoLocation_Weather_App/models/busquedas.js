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

    // parámetros para el String de petición del clima
    get paramsOpenWeather(){
        return{
            'appid': process.env.OPENWEATHER_KEY,
            'units': 'metric',
            'lang': 'es'
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

    async climaLugar(lat, lon){
        try{
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: {...this.paramsOpenWeather, lat, lon}
            });

            // se realiza la petición get al endpoint
            const resp = await instance.get();
            const {weather, main} = resp.data;
            return {
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp
            }
        }
        catch (error){
            console.log(error)
            return [];
        }
    }



}

module.exports = Busquedas;