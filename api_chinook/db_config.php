<?php

// db_config.php



// 1. Configurar MySQLi para lanzar excepciones en lugar de advertencias HTML.

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);



// --- Connection Constants ---

define('DB_SERVER', 'fdb1032.awardspace.net');

define('DB_PORT', 3306);

define('DB_USERNAME', '4714629_chinook');

define('DB_PASSWORD', 'asdQWE123'); 

define('DB_NAME', '4714629_chinook');



// 2. Establecer cabeceras CORS y JSON (debe ser antes de cualquier salida o intento de conexión)

header("Access-Control-Allow-Origin: *");

header("Content-Type: application/json; charset=UTF-8");



// 3. Usar try...catch para envolver el intento de conexión

try {

    $conn = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME, DB_PORT);

    

    // The connect_error check is now redundant but can be kept for quick checks

    // if the try block succeeds but connect_error is still set (less common).

    if ($conn->connect_error) {

        throw new mysqli_sql_exception($conn->connect_error, $conn->connect_errno);

    }

    

} catch (mysqli_sql_exception $e) {

    // este bloque captura fallos de conexion.

    http_response_code(500); 

    

    // 4. Devuelve error JSON
   


    $debugMessage = $e->getMessage(); 


    echo json_encode(array(

        "error" => "Error en la conexión a la base de datos.", 
  

    ));

    exit();

}



?>