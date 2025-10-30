<div id="principal">
  <p>Primer párrafo</p>
  <p>Segundo párrafo</p>
  <p>Tercer párrafo</p>
</div>

<script>
  let capa = document.getElementById("principal");
  let nuevoP = document.createElement("p");
  nuevoP.textContent = "Soy el nuevo párrafo";

  // Selecciona el segundo <p> dentro de #principal
  let pPosterior = document.querySelector("#principal p:nth-of-type(2)");

  // Inserta el nuevo párrafo antes del segundo
  capa.insertBefore(nuevoP, pPosterior);
</script>
