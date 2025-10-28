/* La función va a ir concatenando en una variable el código html que genera la tabla. 
En la definición de la función puedo inicializar los parámetros, 
si me pasan otros valores serán sustituidos automáticamente */
function creaTabla(
  nFilas = 10,
  nCols = 4,
  color = "black",
  contenedorId = "tabla"
) {
  //Utilizo template String para insertar un parámetro en mi string html
  let html = `<table style="border-collapse:collapse;
               border:3px solid ${color}; width:100%;">`;
  // Para cada fila de las nFilas creo nCols celdas
  for (let i = 1; i <= nFilas; i++) {
    html += "<tr>";
    for (let j = 1; j <= nCols; j++) {
      //Creo las celdas con el estilo solicitado añadiendo un espacio
      html += `<td style="border:1px solid ${color}">&nbsp;</td>`;
    }
    html += "</tr>";
  }

  html += "</table>";
  html += "</br>";
  html += "</br>";

  // Usamos innerHTML con += para añadir sin borrar lo que ya hay
  document.getElementById(contenedorId).innerHTML += html;
}
