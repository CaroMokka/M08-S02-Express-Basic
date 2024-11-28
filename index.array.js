import express from "express";
import { v4 as uuidv4 } from "uuid";

const app = express();
const port = 3000;

app.use(express.json());

const listadoEquipos = [];

app.get("/equipos", (req, res) => {
  res.json({ message: "Listado de equipos", data: listadoEquipos });
});

app.post("/equipos", (req, res) => {
  const { nombre, marca } = req.body;

  const repetido = listadoEquipos.some(
    item =>
      item.nombre.toLowerCase() == nombre.toLowerCase() &&
      item.marca.toLowerCase() == marca.toLowerCase()
  );
  if(repetido){
    return res.status(409).json({ message: "Equipo registrado previamente" })
  }
  const equipo = { nombre, marca, id: uuidv4() };
  listadoEquipos.push(equipo);
  res.status(201).json({ message: "Registro de equipo éxitoso", data: equipo });
});

app.put("/equipos/:equipoId", (req, res) => {
    let equipo = listadoEquipos.find(item => item.id == req.params.equipoId)
    if(!equipo){
        return res.status(404).json({ message: "Id ingresado no existe" })
    }
    equipo.nombre = req.body.nombre
    equipo.marca = req.body.marca


  res.json({ message: "Equipo actulazado éxitosamente", data: equipo });
});

app.delete("/equipos/:id", (req, res) => {
    const index = listadoEquipos.findIndex(item => item.id == req.params.id)
    if(index == -1){
        return res.status(404).json({ message: "Id de equipo no se encuentra en los registros"});
    }
    const equipoEliminado = listadoEquipos[index]
    listadoEquipos.splice(index, 1)
  res.json({ message: "Equipo eliminado conn éxito", data: equipoEliminado });
});

app.listen(port, () => console.log(`Servidor escuchando en el puerto ${port}`));
