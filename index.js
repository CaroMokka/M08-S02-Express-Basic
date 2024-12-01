import express from "express";
import { actualizarEquipo, listarEquipos, registrarEquipo, eliminarEquipo } from "./functions/equipos/consultas_db.js";
import { listarVehiculos, modificarVehiculo, registrarVehiculo, eliminarVehiculo } from "./functions/vehiculos/consultas_db.js";
import {validarRegistro, validarActualizacion, validacionDelete } from "./middleware/equipo/validations.js"
import { validarEliminacion, validarModificacion, validarRegistroVehiculo } from "./middleware/vehiculos/validations.js";

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
app.get("/vehiculos", async (req, res) => {
    const listadoVehiculos = await listarVehiculos()
    res.status(listadoVehiculos.code).json({ message: listadoVehiculos.message, data: listadoVehiculos })
})
app.post("/vehiculos", validarRegistroVehiculo, async (req, res) => {
    const dataVehiculo = req.body
    const vehiculo = await registrarVehiculo(dataVehiculo)
    res.status(vehiculo.code).json({data: vehiculo || null})

})
app.put("/vehiculos/:id", validarModificacion, async (req, res) => {
    const idVehiculo = req.params.id
    const dataVehiculo = req.body
    const vehiculo =  await modificarVehiculo(idVehiculo, dataVehiculo)
    res.status(vehiculo.code).json({ data: vehiculo || null })
})
app.delete("/vehiculos/:id", validarEliminacion, async (req, res) => {
    const id_vehiculo = req.params.id
    const vehiculoEliminado = await eliminarVehiculo(id_vehiculo)
    res.status(vehiculoEliminado.code).json({ data: vehiculoEliminado || null })
})
app.listen(port, () => console.log(`Servidor escuchando en el puerto ${port}`));
