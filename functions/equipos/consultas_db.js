import { conexion_db } from "../../conexion.js"


const listarEquipos = async () => {
    const argumentos = {
        text: "SELECT * FROM equipos ORDER BY id",
        values: []
    }
    const { rows: listado } = await conexion_db.query(argumentos)

    return listado
}

const consultarId = async (id) => {
    const equipo = await conexion_db.query("SELECT * FROM equipos WHERE id=$1", [id])
    return equipo.rows[0] || null
}
const registrarEquipo = async (nombre, marca, cantidad) => {
    try{
        const argumentos = {
            text: "INSERT INTO equipos(nombre, marca, cantidad) VALUES($1, $2, $3) RETURNING *",
            values: [nombre.toUpperCase(), marca.toUpperCase(), cantidad]
        }
        const { rows: registro } = await conexion_db.query(argumentos)
    
        return { code: 201, registro, message: "Equipo registrado éxitosamente." }
    } catch(err) {
        if(err.code == "23505"){
            return { code: 409, message: "Ya existe un registro con el mismo nombre y marca." }
        }
        console.log(err.message )
        return { code: 500, message: "Error en el registro de equipo." }
    }
}
const actualizarEquipo = async (equipoId, dataEquipo) => {
    try{
        const argumentos = {
            text: "UPDATE equipos SET nombre=$1, marca=$2, cantidad=$3 WHERE id=$4 RETURNING *",
            values: [dataEquipo.nombre.toUpperCase(), dataEquipo.marca.toUpperCase(), dataEquipo.cantidad, equipoId]
        }
        const { rows: actualizado } = await conexion_db.query(argumentos)
        return { code: 200, actualizado, message: "Equipo actualizado con exito." }
    } catch(err){
        if(err.code == "23505"){
            return { code: 409, message: "Ya existe un registro con el mismo nombre y marca." }
        }
        console.log(err.message )
        return { code: 500, message: "Error en la actualización de equipo." }
    }
}
const eliminarEquipo = async (equipoId) => {
     try{
        const argumentos = {
            text: "DELETE FROM equipos WHERE id=$1 RETURNING *",
            values: [equipoId]
        }
        const { rows: eliminado } = await conexion_db.query(argumentos)
        return { code: 200, eliminado, message: "Equipo a sido eliminado con éxito."}
     }catch(err){
        console.log(err.message)
        return { code: 500, message: "Ocurrió un error eliminando equipo." }
     }
}

export { listarEquipos, registrarEquipo, actualizarEquipo, eliminarEquipo, consultarId } 