import express from "express";
import { actualizarEquipo, listarEquipos, registrarEquipo, eliminarEquipo } from "./functions/equipos/consultas_db.js";
import {validarRegistro, validarActualizacion, validacionDelete } from "./middleware/equipo/validations.js"

const app = express();
const port = 3000;

app.use(express.json());


//RUTAS TABLA EQUIPOS --------------------------------------->
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
//FIN RUTAS TABLA EQUIPOS --------------------------------------->

//RUTAS TABLA VEHICULOS --------------------------------------->

app.listen(port, () => console.log(`Servidor escuchando en el puerto ${port}`));
