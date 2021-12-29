const Materia = require('./materia')
class Materias{
    _listadoMaterias = {};
    constructor(props) {
        this._listadoMaterias = {};
    }
    get listadoMaterias(){
        const listado = [];
        Object.keys(this._listadoMaterias).forEach( key => {
            const materia = this._listadoMaterias[key];
            listado.push(materia);
        })
        return listado
    }

    listadoMateriasAlumno(idAlumno = ''){
        const listado = [];
        Object.values(this._listadoMaterias).forEach( materia => {
            if(materia.idEstudiante === idAlumno){
                //const materia = this._listadoMaterias[key];
                listado.push(materia);
            }

        })
        return listado
    }

    cargarMateriafromArray(materias = []){
        materias.forEach( materia => {
            this._listadoMaterias[materia.id] = materia;
        } )
    }

    crearMateria(idAlumno, nombreMateria, calificacion){
        const materia = new Materia(idAlumno,nombreMateria,calificacion);
        // acceder a las propiedades
        this._listadoMaterias[materia.id] = materia;
    }

    borrarMateria(id = ''){
        if(this._listadoMaterias[id]){
            delete this._listadoMaterias[id];
        }
    }

    actualizarMateria(id = '', atributoActualizar, valorActualizar){
        Object.values(this._listadoMaterias).forEach( materia => {
            if(materia.id === id){
                materia[atributoActualizar] = valorActualizar;
            }
        })
    }

}
module.exports = Materias;