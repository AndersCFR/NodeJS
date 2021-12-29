const inquirer = require('inquirer');
const fs = require('fs');
require('colors')

const Alumnos = require('./models/alumnos');
const Materias = require('./models/materias')

const {guardarDB, leerDB} = require("./Archivos/archivosAlumno");
const {guardarDBMateria, leerDBMateria} = require('./Archivos/archivosMateria')

const opcionesMenu = ['Gestión alumnos','Gestión materias','Cerrar programa'];
const opcionesMenuAlumno = ['Crear alumno', 'Listar alumnos', 'Actualizar alumno', 'Borrar alumno', 'Volver al menu principal'];
const opcionesMenuMateria = ['Crear materia','Listar todas las materias','Actualizar Materias','Borrar materias', 'Listar materia por alumno', 'Volver al menu principal'];
const opcionesAtributosActualizarAlumno = ['Nombre','Apellido','Carrera','Matriculado'];
const opcionesAtributosActualizarMateria = ['NombreMateria', 'Calificacion', 'Finalizada'];

const main = async() => {

    let opcion='';
    const alumnos = new Alumnos();
    const alumnosDB = leerDB();
    const materias = new Materias();
    const materiasDB = leerDBMateria();

    if(alumnosDB){
        alumnos.cargarAlumnofromArray(alumnosDB);
    }

    if(materiasDB){
        materias.cargarMateriafromArray(materiasDB);
    }

    while(opcion !== opcionesMenu[2]) {
        opcion = await menu();
        console.log(opcion);
        //await pausa();
        switch (opcion){

            // Opción submenú de alumnos

            case opcionesMenu[0]:
                console.log('Alumnos')
                let opcionAlumno = await menuAlumnos();

                switch (opcionAlumno){

                        // Opción crear alumno
                    case opcionesMenuAlumno[0]:
                        const {nombre, apellido, carrera} = await leerInputAlumno();
                        alumnos.crearAlumno(nombre,apellido,carrera)
                        console.log('Alumno creado!!!'.yellow)
                        break;

                        // Opción mostrar materias
                    case opcionesMenuAlumno[1]:
                        console.log(alumnos.listadoAlumnos);
                        break;

                        // Opción actualizar alumno
                    case opcionesMenuAlumno[2]:
                        const idActualizar = await listarAlumnosConsola(alumnos.listadoAlumnos);
                        //console.log(`id para actualziar ${idActualizar}`)
                        await pausa()
                        let atributoAct = await  atributoActualizar();
                        const valorActualizar = await leerValorActualizar(atributoAct);
                        atributoAct = atributoAct.toLowerCase();
                        alumnos.actualizarAlumno(idActualizar, atributoAct, valorActualizar);
                        console.log(atributoAct+' correctamente actualizado !!'.yellow)
                        break;

                        // Opción borrar alumno
                    case opcionesMenuAlumno[3]:
                        const idBorrar = await listarAlumnosConsola(alumnos.listadoAlumnos);
                        const confirmarBorrar = await confirmar('¿Estás seguro de borrar este alumno?')
                        if (confirmarBorrar){
                            alumnos.borrarAlumno(idBorrar);
                            console.log('Alumno borrado!!!'.yellow)
                        }
                        break;
                }
                guardarDB(alumnos.listadoAlumnos);
                await  pausa();
                break;


            // ** Opción submenú de materias **

            case opcionesMenu[1]:

                let opcionMateria = await menuMateria();
                switch (opcionMateria){

                        // Opción crear nueva materia
                    case opcionesMenuMateria[0]:
                        const {nombreMateria, calificacion} = await leerInputMateria();
                        let calificacionInt = parseInt(calificacion)
                        const idAlumnoMateria = await listarAlumnosConsola(alumnos.listadoAlumnos);
                        materias.crearMateria(idAlumnoMateria,nombreMateria,calificacionInt);
                        break;

                        // Opción imprimir materias
                    case opcionesMenuMateria[1]:
                        console.log(materias.listadoMaterias);
                        break;

                        // Opción actualizar materia
                    case opcionesMenuMateria[2]:
                        const idActualizar = await listarMateriasConsola(materias.listadoMaterias);
                        await pausa()
                        let atributoAct = await atributoActualizarMateria();
                        const valorActualizar = await leerValorActualizar(atributoAct);
                        atributoAct = atributoAct.toLowerCase();
                        materias.actualizarMateria(idActualizar, atributoAct, valorActualizar);
                        console.log(atributoAct+' correctamente actualizado !!'.yellow)
                        break;

                        // Opción eliminar materia
                    case opcionesMenuMateria[3]:
                        const idBorrar = await listarMateriasConsola(materias.listadoMaterias);
                        const confirmarBorrar = await confirmar('¿Estás seguro de borrar esta materia?')
                        if (confirmarBorrar){
                            materias.borrarMateria(idBorrar);
                            console.log('Materia borrada!!!'.yellow)
                        }
                        break;

                        // Opción listar por alumno
                    case opcionesMenuMateria[4]:
                        const idAlumno = await listarAlumnosConsola(alumnos.listadoAlumnos);
                        console.log(materias.listadoMateriasAlumno(idAlumno));
                        break;
                }

                // La información se mantendrá en memoria hasta que se guarde en el .json
                guardarDBMateria(materias.listadoMaterias);
                await  pausa();
                break;
        }
    }
}

const menu = async() => {
    console.clear()
    console.log('======================================'.blue)
    console.log('\t  Menú Principal'.green)
    console.log('======================================'.blue)
    const {opcionMenu} = await inquirer.prompt({
            type: 'list',
            name: 'opcionMenu',
            message: 'Escoge una opción',
            choices: opcionesMenu
        }
    )
    return opcionMenu;
}

const menuAlumnos = async() => {
    console.clear();
    console.log('======================================'.green)
    console.log('\tAlumnos'.blue)
    console.log('======================================'.green)
    const {respuestaMenuAlumno} = await inquirer.prompt(
        {
            type: 'list',
            name: 'respuestaMenuAlumno',
            message: 'Escoge la opción',
            choices: opcionesMenuAlumno,
        }
    )
    return respuestaMenuAlumno
}

const menuMateria = async() => {
    console.clear();
    console.log('======================================'.green)
    console.log('\tMaterias'.blue)
    console.log('======================================'.green)
    const {respuestaMenuMateria} = await inquirer.prompt(
        {
            type: 'list',
            name: 'respuestaMenuMateria',
            message: 'Escoge la opción',
            choices: opcionesMenuMateria,
        }
    )
    return respuestaMenuMateria
}

const atributoActualizar = async() => {
    console.clear();
    console.log('\n\tAtributo Actualizar Alumno'.red)
    const {respuestaAtributoActualizar} = await inquirer.prompt(
        {
            type: 'list',
            name: 'respuestaAtributoActualizar',
            message: 'Escoge el atributo que necesitas actualizar',
            choices: opcionesAtributosActualizarAlumno,
        }
    )
    return respuestaAtributoActualizar
}

const atributoActualizarMateria = async() => {
    console.clear();
    console.log('\n\tAtributo Actualizar Materia'.red)
    const {respuestaAtributoActualizar} = await inquirer.prompt(
        {
            type: 'list',
            name: 'respuestaAtributoActualizar',
            message: 'Escoge el atributo que necesitas actualizar',
            choices: opcionesAtributosActualizarMateria,
        }
    )
    return respuestaAtributoActualizar
}

const pausa = async () => {
    await inquirer.prompt({
        type: 'input',
        name: 'enter',
        message: `Presione ${'enter'.green} para continuar`
    })
}

const leerInputAlumno = async() => {
    const pregunta =[
        {
            type: 'input',
            name: 'nombre',
            message: 'Ingrese el nombre del alumno',
            validate(value){
                if (value.length === 0){
                    return 'Se debe ingresar todos los datos del alumno'
                }
                return true;
            }
        },
        {
            type: 'input',
            name: 'apellido',
            message: 'Ingrese el apellido del alumno',
            validate(value){
                if (value.length === 0){
                    return 'Se debe ingresar todos los datos del alumno'
                }
                return true;
            }
        },
        {
            type: 'input',
            name: 'carrera',
            message: 'Ingrese la carrera del alumno',
            validate(value){
                if (value.length === 0){
                    return 'Se debe ingresar todos los datos del alumno'
                }
                return true;
            }
        },
    ];
    return await  inquirer.prompt(pregunta);
}


const leerInputMateria = async() => {
    const pregunta =[
        {
            type: 'input',
            name: 'nombreMateria',
            message: 'Ingrese el nombre de la materia',
            validate(value){
                if (value.length === 0){
                    return 'Se debe ingresar todos los datos de la materia'
                }
                return true;
            }
        },
        {
            type: 'input',
            name: 'calificacion',
            message: 'Ingrese la calificación de la materia',
            validate(value){
                if (value.length === 0){
                    return 'Se debe ingresar todos los datos de la materia'
                }
                return true;
            }
        },
    ];
    return await  inquirer.prompt(pregunta);
}


const listarAlumnosConsola = async(alumnos = []) =>{
    // Función que permite listar todos los alumnos en consola
    // return: Devulve el id del alumno seleccionado
    const choices = alumnos.map( (alumno,i) => {
        const idx = `${i + 1}`
        return{
            value: alumno.id,
            name: `${idx} ${alumno.nombre}`
        }
    });
    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Escoger Alumno'.blue,
            choices: choices
        }
    ]
    const {id} = await inquirer.prompt(preguntas);
    return id;
}

const listarMateriasConsola = async(materias = []) =>{
    // Función que permite listar todas las materias en consola
    // return: Devulve el id de la materia seleccionada
    const choices = materias.map( (materia,i) => {
        const idx = `${i + 1}`
        return{
            value: materia.id,
            name: `${idx} Materia: ${materia.nombreMateria} Alumno: ${materia.idEstudiante}`
        }
    });
    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Escoger materia'.blue,
            choices: choices
        }
    ]
    const {id} = await inquirer.prompt(preguntas);
    return id;
}


const leerValorActualizar = async(atributoActualizar= '') => {
    const pregunta =[
        {
            type: 'input',
            name: 'valorIngresado',
            message: `Ingrese el ${ atributoActualizar }`.yellow,
            validate(value){
                if (value.length === 0){
                    return 'Se debe ingresar el nuevo valor a actualizar'
                }
                return true;
            }
        }
    ];
    const {valorIngresado} = await inquirer.prompt(pregunta);
    return valorIngresado;
}


const confirmar = async (mensaje) => {
    const pregunta = [
        {
            type: 'confirm',
            name: 'ok',
            message: mensaje
        }
    ];
    const { ok } = await inquirer.prompt(pregunta);
    return ok;
}

module.exports = main();