const Alumno = require('./alumno')

class Alumnos{
    _listadoAlumnos = {};
    constructor(props) {
        this._listadoAlumnos = {};
    }

    get listadoAlumnos(){
        const listado = [];
        Object.keys(this._listadoAlumnos).forEach( key => {
            const alumno = this._listadoAlumnos[key];
            listado.push(alumno);
        })
        return listado
    }

    cargarAlumnofromArray(alumnos = []){
        alumnos.forEach( alumno => {
            this._listadoAlumnos[alumno.id] = alumno;
        } )
    }

    crearAlumno(nombre, apellido, carrera){
        const alumno = new Alumno(nombre, apellido, carrera);
        // acceder a las propiedades
        this._listadoAlumnos[alumno.id] = alumno;
    }

    borrarAlumno(id = ''){
     if(this._listadoAlumnos[id]){
         delete this._listadoAlumnos[id];
     }
    }

    actualizarAlumno(id = '', atributoActualizar, valorActualizar){
        Object.values(this._listadoAlumnos).forEach( alumno => {
            if(alumno.id === id){
                alumno[atributoActualizar] = valorActualizar;
            }
        })
    }


}
module.exports = Alumnos;