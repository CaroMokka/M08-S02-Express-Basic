import express from "express";
import { listarEquipos, registrarEquipo } from "./functions/equipos/consultas_db.js";

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

app.put("/equipos/:equipoId", (req, res) => {});

app.delete("/equipos/:id", (req, res) => {});

app.listen(port, () => console.log(`Servidor escuchando en el puerto ${port}`));
