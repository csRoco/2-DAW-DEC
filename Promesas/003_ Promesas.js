// Objeto que simula un servicio que obtiene datos del "servidor"
const ServicioDatos = {
  // Método que devuelve una PROMESA
  obtenerDatos() {
    // Creamos y devolvemos una nueva Promise
    return new Promise((resolve, reject) => {
      console.log("Solicitando datos...");

      // Simulamos una operación que tarda 1,5 segundos
      setTimeout(() => {
        // Resultado aleatorio: éxito o error
        const todoBien = Math.random() > 0.5;

        if (todoBien) {
          resolve({
            mensaje: "Datos recibidos correctamente",
            fecha: new Date(),
          });
        } else {
          reject(new Error("Error al obtener los datos desde el servidor"));
        }
      }, 1500);
    });
  },
};

// Aquí SÍ usamos la promesa
ServicioDatos.obtenerDatos()
  .then((resultado) => {
    console.log("PROMESA CUMPLIDA");
    console.log(resultado);
  })
  .catch((error) => {
    console.log("PROMESA RECHAZADA");
    console.log(error.message);
  })
  .finally(() => {
    console.log("Operación terminada");
  });
