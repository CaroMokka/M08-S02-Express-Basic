import { conexion_db } from "../../conexion.js"


const consultarIdVehiculo = async (id) => {
    const vehiculo = await conexion_db.query("SELECT * FROM vehiculos WHERE id=$1", [id])
    return vehiculo.rows[0] || null
}

const listarVehiculos = async () => {
    const argumentos = {
        text: "SELECT * FROM vehiculos ORDER BY id",
        values: []
    }
    const { rows: listadoVehiculos } = await conexion_db.query(argumentos)
    return { code: 200, message: "Listado de vehiculos exitoso.", data: listadoVehiculos }
}

const registrarVehiculo = async (dataVehiculo) => {
    try{
        const argumentos = {
            text: "INSERT INTO vehiculos(patente, marca) VALUES($1, $2) RETURNING *",
            values: [dataVehiculo.patente.toUpperCase(), dataVehiculo.marca.toUpperCase()]
        }
        const { rows: vehiculoRegistrado } = await conexion_db.query(argumentos)
        return { code: 201, vehiculoRegistrado , message: "Vehículo registrado exitosamente." }
    } catch(err){
        if(err.code == "23505"){
            return { code: 409, message: "Ya existe un registro con la misma patente y marca." }
        }
        console.log(err.message )
        return { code: 500, message: "Error en el registro de equipo." }
    }
}

const modificarVehiculo = async (id_vehiculo, data_vehiculo) => {
   try{
    const argumentos = {
        text: "UPDATE vehiculos SET patente=$1, marca=$2 WHERE id=$3 RETURNING *", 
        values: [data_vehiculo.patente.toUpperCase(), data_vehiculo.marca.toUpperCase(), id_vehiculo]
    }
    const { rows: vehiculoModificado } = await conexion_db.query(argumentos)
    return { code: 200, vehiculoModificado , message: "Vehículo modificado exitosamente." }
   } catch(err) {
    if(err.code == "23505"){
        return { code: 409, message: "Ya existe un registro con el mismo nombre y marca." }
    }
    console.log(err.message )
    return { code: 500, message: "Error en la modificación del equipo." }
   }
}
const eliminarVehiculo = async (id_vehiculo) => {
    const argumentos = {
        text: "DELETE FROM vehiculos WHERE id=$1 RETURNING *",
        values: [id_vehiculo]
    }
    const { rows: vehiculoEliminado } = await conexion_db.query(argumentos)
    return { code: 200, vehiculoEliminado, message: "Vehículo eliminado correctamente" }
}

export { listarVehiculos, registrarVehiculo, modificarVehiculo, consultarIdVehiculo, eliminarVehiculo}