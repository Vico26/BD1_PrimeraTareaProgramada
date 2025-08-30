const { sql, config } = require('./db');

async function probarConexion() {
    try {
        let pool = await sql.connect(config);

        // Ejemplo: leer clientes
        let result = await pool.request().execute('sp_obtenerEmpleados');

        console.log("Resultados:", result.recordset);  // 👈 esto imprime los datos en consola

        sql.close();
    } catch (err) {
        console.error("Error probando la conexión:", err);
    }
}

module.exports={probarConexion};