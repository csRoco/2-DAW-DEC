<?php
// api_chinook.php
// 1. Establecer la cabecera JSON
header('Content-Type: application/json'); 

// 2. (OPCIONAL pero vital si el JS no está en el mismo dominio) Habilitar CORS
// Permite que navegadores de cualquier dominio accedan a esta API
header('Access-Control-Allow-Origin: *');

// Incluir la configuración de la base de datos y establecer la conexión
include 'db_config.php'; 

// --- 1. Definir la Consulta SQL basada en la Petición ---
// Por simplicidad, usaremos un parámetro 'action'
$action = isset($_GET['action']) ? $_GET['action'] : '';

switch ($action) {
    case 'artists':
        // Consulta segura para obtener artistas
        $sql = "SELECT ArtistId, Name FROM Artist ORDER BY Name LIMIT 50";
        break;
    case 'tracksbyartist':
        // Obtener el ID del artista de la URL (ej: ?action=tracksbyartist&artist_id=1)
        $artistId = isset($_GET['artist_id']) ? (int)$_GET['artist_id'] : 0;

        if ($artistId === 0) {
            http_response_code(400);
            echo json_encode(array("error" => "Falta el ID de artista para la acción tracksbyartist."));
            exit();
        }

        // Consulta para obtener pistas de ese artista (solo Rock, si es necesario)
        $sql = "SELECT T.Name AS TrackName, A.Title AS AlbumTitle, Ar.Name AS ArtistName, T.UnitPrice
                FROM Track T
                JOIN Album A ON T.AlbumId = A.AlbumId
                JOIN Artist Ar ON A.ArtistId = Ar.ArtistId
                WHERE Ar.ArtistId = " . $artistId . " AND T.GenreId = 1
                LIMIT 50";
        break;
    case 'rocktracks':
        // Obtener todas las canciones del género 'Rock' (GenreId = 1)
        $sql = "SELECT T.Name AS TrackName, A.Title AS AlbumTitle, Ar.Name AS ArtistName, T.UnitPrice
                FROM Track T
                JOIN Album A ON T.AlbumId = A.AlbumId
                JOIN Artist Ar ON A.ArtistId = Ar.ArtistId
                WHERE T.GenreId = 1
                LIMIT 50";
        break;

    // Si no se especifica una acción válida
    default:
        http_response_code(400); // Bad Request
        echo json_encode(array("error" => "Acción no válida o no especificada."));
        exit();
}


// --- 2. Ejecutar la Consulta y Recoger Resultados ---
$result = $conn->query($sql);
$data = array();

if ($result) {
    if ($result->num_rows > 0) {
        // Recorrer los resultados y almacenarlos en un array
        while($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
    } else {
        // No se encontraron resultados (código 200 OK, pero datos vacíos)
        http_response_code(200);
        echo json_encode(array("message" => "No se encontraron resultados.", "data" => []));
        $conn->close();
        exit();
    }
} else {
    // Error en la consulta SQL
    http_response_code(500);
    echo json_encode(array("error" => "Error en la consulta SQL: " . $conn->error));
    $conn->close();
    exit();
}


// --- 3. Devolver los Resultados en Formato JSON ---
// Si todo fue bien (código 200 OK por defecto)
echo json_encode($data);

// --- 4. Cerrar Conexión ---
$conn->close();

?>