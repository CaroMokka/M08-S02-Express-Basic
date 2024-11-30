import express from "express";
import { conexion_db } from "./conexion.js";
import { actualizarEquipo, listarEquipos, registrarEquipo, eliminarEquipo, consultarId } from "./functions/equipos/consultas_db.js";

const app = express();
const port = 3000;

app.use(express.json());

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
app.get("/equipos", async (req, res) => {
  const listadoEquipos = await listarEquipos();
  res.json({
    message: "Listado de equipos registrados.",
    data: listadoEquipos,
  });
});

app.post("/equipos", validarRegistro,async (req, res) => {
    const {nombre, marca, cantidad} = req.body  
    const equipoRegistrado = await registrarEquipo(nombre, marca, cantidad)
    res.status(equipoRegistrado.code).json({ message: equipoRegistrado.message, data: equipoRegistrado.registro || null })
});

app.put("/equipos/:equipoId", validarActualizacion,async (req, res) => {
     //Validar que el equipo ID exista en el registro, en caso de no existir devolver code 404 y un message

    const dataEquipo = req.body
    const idEquipo = req.params.equipoId  
    const  equipo = await actualizarEquipo(idEquipo, dataEquipo)
    res.status(equipo.code).json({ message: equipo.message, data: equipo.actualizado || null  })
});

app.delete("/equipos/:id", validacionDelete, async (req, res) => {
    //Validar que el equipo ID exista en el registro, en caso de no existir devolver code 404 y un message
    const equipo = await eliminarEquipo(req.params.id)
    res.status(equipo.code).json({ message: equipo.message, data: equipo.eliminado || null })
});

app.listen(port, () => console.log(`Servidor escuchando en el puerto ${port}`));
