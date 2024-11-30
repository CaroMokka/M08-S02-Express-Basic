import express from "express";
import { actualizarEquipo, listarEquipos, registrarEquipo, eliminarEquipo } from "./functions/equipos/consultas_db.js";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/equipos", async (req, res) => {
  const listadoEquipos = await listarEquipos();
  res.json({
    message: "Listado de equipos registrados.",
    data: listadoEquipos,
  });
});

app.post("/equipos", async (req, res) => {
    const {nombre, marca, cantidad} = req.body
    const equipoRegistrado = await registrarEquipo(nombre, marca, cantidad)
    res.status(equipoRegistrado.code).json({ message: equipoRegistrado.message, data: equipoRegistrado.registro || null })
});

app.put("/equipos/:equipoId", async (req, res) => {
    const dataEquipo = req.body
    const idEquipo = req.params.equipoId  
    const  equipo = await actualizarEquipo(idEquipo, dataEquipo)
    res.status(equipo.code).json({ message: equipo.message, data: equipo.actualizado || null  })

});

app.delete("/equipos/:id", async (req, res) => {
    const equipo = await eliminarEquipo(req.params.id)
    console.log("Equipo",equipo)
    res.status(equipo.code).json({ message: equipo.message, data: equipo.eliminado || null })
});

app.listen(port, () => console.log(`Servidor escuchando en el puerto ${port}`));
