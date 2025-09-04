/*
The file server.js is the main server file for a Node.js application using the Express framework.
Works with the dataObetener.js file to fetch employee data from a SQL Server database 
and serve it via HTTP endpoints.
*/
const express = require("express");
const path = require("path");
const empleadosRuta=require("./serverProcesos");

const app = express();  // Crea una instancia de la app Express
app.use(express.json()); // Middleware para parsing de JSON, sin el parsing daba error
app.use(express.static("public")); // Sirve archivos estáticos desde la carpeta "public"

// Ruta para la página principal
app.get("/", async (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Ruta para obtener empleados (Por el momento tira todos los empleados obtenidos)
app.use("/empleados", empleadosRuta); // Importa las rutas definidas en serverProcesos.js

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
