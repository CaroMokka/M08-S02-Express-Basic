import { conexion_db } from "../../conexion.js"


const listarEquipos = async () => {
    const argumentos = {
        text: "SELECT * FROM equipos",
        values: []
    }
    const { rows: listado } = await conexion_db.query(argumentos)

    return listado
}
const registrarEquipo = async (nombre, marca, cantidad) => {
    try{
        const argumentos = {
            text: "INSERT INTO equipos(nombre, marca, cantidad) VALUES($1, $2, $3) RETURNING *",
            values: [nombre, marca, cantidad]
        }
        const { rows: registro } = await conexion_db.query(argumentos)
    
        return { code: 201, registro, message: "Equipo registrado éxitosamente." }
    } catch(err) {
        console.log(err.message)
        return { code: 500, message: "Error en el registro de equipo." }
    }
}
const actualizarEquipo = () => {}
const eliminarEquipo = () => {}

export { listarEquipos, registrarEquipo }