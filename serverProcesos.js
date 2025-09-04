const express = require("express");
const { obtenerEmpleados } = require("./dataObtener");
const { insertarEmpleado } = require("./dataInsertar");
const router = express.Router();

router.get("/", async (req, res) => {
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
router.post("/", async (req, res) => {
  const {nombre,salario }= req.body
    if(!nombre || !salario){
      return res.status(400).json({error:"Faltan datos"})
    }
  try {
    await insertarEmpleado(nombre,salario);
    if(insertarEmpleado(nombre,salario)===-1){
      return res.status(400).json({error:"El empleado ya existe en la base de datos"})
    }
    res.json({message:"Empleado insertado correctamente"});
  } catch (err) {
    console.error("Error al insertar:", err);
    res.status(500).json({ 
      error: "Error al insertar empleado",
      detalles: err.message
    });
}
});
module.exports = router;