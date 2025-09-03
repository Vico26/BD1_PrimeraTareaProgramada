/*
The file server.js is the main server file for a Node.js application using the Express framework.
Works with the dataObetener.js file to fetch employee data from a SQL Server database 
and serve it via HTTP endpoints.
*/
const express = require("express");
const path = require("path");
const { obtenerEmpleados } = require("./dataObtener");

const app = express();  // Crea una instancia de la app Express
app.use(express.json()); // Middleware para parsing de JSON, sin el parsing daba error
app.use(express.static("public")); // Sirve archivos estáticos desde la carpeta "public"

// Ruta para la página principal
app.get("/", async (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Ruta para obtener empleados (Por el momento tira todos los empleados obtenidos)
app.get("/empleados", async (req, res) => {
  try {
    let results = await obtenerEmpleados();// Se obtiene una array de los empleados
    console.log("Empleados obtenidos:", results);   // Imprime los empleados en la consola del servidor.
    res.json(results);// Envía los empleados como respuesta en formato JSON
  } catch (err) {   // Manejo de errores
    console.error("Error detallado:", err);
    res.status(500).json({ 
      error: "Error al obtener empleados",
      detalles: err.message
    });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
