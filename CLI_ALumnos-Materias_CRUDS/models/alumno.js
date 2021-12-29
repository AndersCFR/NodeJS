const { v4: uuid4 } = require('uuid');

class Alumno{
    id = '';
    nombre = '';
    apellido = '';
    //materias = null;
    carrera = '';
    matriculado = true;

    constructor(nombre, apellido, carrera) {
        this.id = uuid4();
        this.nombre = nombre;
        this.apellido = apellido;
        this.carrera = carrera;
    }
}

module.exports = Alumno;