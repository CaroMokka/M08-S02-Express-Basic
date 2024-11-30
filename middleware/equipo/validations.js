import { consultarId } from "../../functions/equipos/consultas_db.js"
const validarRegistro = (req, res, next) => {
    if(!req.body.nombre || req.body.nombre.trim()  == ""){
        return res.status(422).json({ message: "Por favor enviar el nombre." })
    }
    if(!req.body.marca || req.body.marca.trim()  == ""){
        return res.status(422).json({ message: "Por favor ingresar la marca" })
    }
    if(!req.body.cantidad){
        return res.status(422).json({ message: "Por favor ingresar la cantidad" })
    }
    if(isNaN(req.body.cantidad)){
        return res.status(422).json({ message: "La cantidad debe ser numérica." })
    }
    next()
}

const validarActualizacion = async (req, res, next) => {
    const idEquipo = req.params.equipoId
    if(isNaN(idEquipo)){
        return res.status(422).json({ message: "El Id debe ser numérica." })
    }
    const validacion = await consultarId(idEquipo)
    if(!validacion){
        return res.status(404).json({ message: "Equipo a actualizar no existe" })
    }
    if(!req.body.nombre || req.body.nombre.trim()  == ""){
        return res.status(422).json({ message: "Por favor enviar el nombre." })
    }
    if(!req.body.marca || req.body.marca.trim()  == ""){
        return res.status(422).json({ message: "Por favor ingresar la marca" })
    }
    if(!req.body.cantidad){
        return res.status(422).json({ message: "Por favor ingresar la cantidad" })
    }
    if(isNaN(req.body.cantidad)){
        return res.status(422).json({ message: "La cantidad debe ser numérica." })
    }

    next()
}

const validacionDelete = async (req, res, next) => {
    const idEquipo = req.params.id
    if(isNaN(idEquipo)){
        return res.status(422).json({ message: "El Id debe ser numérica." })
    }
    const validacion = await consultarId(idEquipo)
    if(!validacion){
        return res.status(404).json({ message: "Equipo a eliminar no existe" })
    }

    next()
}

export { validarRegistro, validarActualizacion, validacionDelete }