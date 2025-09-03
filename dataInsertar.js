const {sql,config}=require('./db');  //importacion del modulo de la base de datos
async function insertarEmpleado(nombre, salario){
    try{
        let pool= await sql.connect(config);   //conexion a la base de datos

        let result= await pool.request()   //ejecucion del procedimiento almacenado
        .input('Nombre',sql.VarChar(128), nombre)
        .input('Salario',sql.Money,salario)
        .execute('sp_insertarEmpleados');
        console.log("Empleado insertado correctamente");
        return result.rowsAffected;   //retorna el numero de filas afectadas

    }catch (err){
        if (err.number === -1) {
            console.error("El empleado ingredado ya existe en la Base de Datos"); // Error de clave primaria duplicada
            throw err;
    }}finally{
        sql.close();    
    }
}
module.exports={insertarEmpleado};   //exportacion de la funcion para ser utilizada en otros archivos
insertarEmpleado("Antonio Barrantes Madrigal", 120000.00);