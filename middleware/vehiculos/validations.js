import { consultarIdVehiculo } from "../../functions/vehiculos/consultas_db.js"
const validarRegistroVehiculo = (req, res, next) => {
    if(!req.body.patente || req.body.patente.trim()  == ""){
        return res.status(422).json({ message: "Por favor enviar la patente." })
    }
    if(!req.body.marca || req.body.marca.trim()  == ""){
        return res.status(422).json({ message: "Por favor enviar la marca" })
    }
    next()
}
const validarModificacion = async (req, res, next) => {
    const id_vehiculo = req.params.id
    if(isNaN(id_vehiculo)){
        return res.status(422).json({ message: "El Id debe ser numérico." })
    }
    const validacion = await consultarIdVehiculo(id_vehiculo)
    if(!validacion){
        return res.status(404).json({ message: "Vehículo a modificar no existe" })
    }
    if(!req.body.patente || req.body.patente.trim() == "" ){
        return res.status(404).json({ message: "Por favor enviar patente" })
    }
    if(!req.body.marca || req.body.marca.trim() == "" ){
        return res.status(404).json({ message: "Por favor enviar marca" })
    }
    next()
    
}
const validarEliminacion = async (req, res, next) => {
    const id_vehiculo = req.params.id
    if(isNaN(id_vehiculo)){
        return res.status(422).json({ message: "El Id debe ser numérico." })
    }
    const validacion = await consultarIdVehiculo(id_vehiculo)
    if(!validacion){
        return res.status(404).json({ message: "Vehículo a eliminnar no existe" })
    }
    next()
}

export { validarRegistroVehiculo, validarModificacion, validarEliminacion }