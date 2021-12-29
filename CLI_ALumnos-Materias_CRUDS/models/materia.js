const {v4: uuid4} = require("uuid");

class Materia{
    id = '';
    idEstudiante = '';
    nombreMateria = '';
    calificacion = 7;
    finalizada = false;

    constructor(idEstudiante, nombreMateria,calificacion) {
        this.id = uuid4();
        this.idEstudiante = idEstudiante;
        this.nombreMateria = nombreMateria;
        this.calificacion = calificacion;
    }
}
module.exports = Materia;