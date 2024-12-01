import { conexion_db } from "../../conexion.js"

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

const modificarVehiculo = () => {

}

export { listarVehiculos, registrarVehiculo }