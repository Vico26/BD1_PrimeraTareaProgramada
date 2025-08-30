const express = require("express"); // Importa Express
const { obtenerEmpleados } = require("./data"); // Importa la función obtenerEmpleados desde data.js
const app = express();  // Crea una instancia de la app Express

// Middleware para parsing de JSON, sin el parsing daba error
app.use(express.json());

// Ruta para obtener empleados (Por el momento tira todos los empleados obtenidos)
app.get("/", async (req, res) => {
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