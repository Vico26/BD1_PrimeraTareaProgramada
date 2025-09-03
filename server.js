const express = require("express");
const path = require("path");

const app = express();  // Crea una instancia de la app Express

// Middleware para parsing de JSON, sin el parsing daba error
app.use(express.json());

// Ruta para obtener empleados (Por el momento tira todos los empleados obtenidos)
app.get("/", async (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});