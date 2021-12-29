const fs = require('fs');
const archivo = '../db/materias.json';

const guardarDBMateria = (data) => {
    fs.writeFileSync(archivo, JSON.stringify(data));
}

const leerDBMateria = () => {
    if(!fs.existsSync(archivo)){
        return null
    }
    const info = fs.readFileSync(archivo, {encoding: 'utf-8'});
    const data = JSON.parse(info);
    return data
}

module.exports ={
    guardarDBMateria,
    leerDBMateria,
}