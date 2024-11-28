import pkg from "pg"

const { Pool } = pkg
const conexion_db = new Pool({
    user: "postgres",
    password: "postgres",
    host: "localhost",
    database: "gestionEquipos",
    port: 5432,
})

export { conexion_db }
