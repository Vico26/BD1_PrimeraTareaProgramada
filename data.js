const {sql,config}=require('./db');  //importacion del modulo de la base de datos

async function obtenerEmpleados(){          //funcion para obtener los empleados
    try{
        let pool= await sql.connect(config);   //conexion a la base de datos

        //ejecucion del procedimiento almacenado
        let result= await pool.request().execute('sp_obtenerEmpleados');
        console.log("Resultados: ",result.recordset);  //imprime los datos en consola
        sql.close();

        return result.recordset;   //retorna los registros obtenidos

    }   catch (err){
        console.error("Error al obtener los empleados: ",err);
        throw err;
    }
}
//obtenerEmpleados();
module.exports={obtenerEmpleados};   //exportacion de la funcion para ser utilizada en otros archivos