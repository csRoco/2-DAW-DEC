// Clase base: Ordenador
class Ordenador {
  // Constructor con valores por defecto
  constructor(marca, modelo, ram = 4, disco = 512, pulgadas = 17) {
    this.marca = marca; // Marca del ordenador
    this.modelo = modelo; // Modelo del ordenador
    this.ram = ram; // Memoria RAM en GB
    this.disco = disco; // Capacidad del disco duro en GB
    this.pulgadas = pulgadas; // Tamaño de la pantalla en pulgadas
  }

  // Método que devuelve la información del ordenador en formato texto
  toString() {
    return (
      `Marca: ${this.marca}\n` +
      `Modelo: ${this.modelo}\n` +
      `RAM: ${this.ram} GB\n` +
      `Disco duro: ${this.disco} GB\n` +
      `Pulgadas: ${this.pulgadas} pulgadas\n`
    );
  }
}

// Clase derivada: Portatil hereda de Ordenador
class Portatil extends Ordenador {
  // Constructor con valores por defecto
  constructor(
    marca,
    modelo,
    ram = 4,
    disco = 256,
    pulgadas = 13,
    autonomia = 4
  ) {
    // Llama al constructor de la clase base
    super(marca, modelo, ram, disco, pulgadas);
    this.autonomia = autonomia; // Autonomía de la batería en horas
  }

  // Sobrescribe el método toString() de la clase base
  toString() {
    // Llama al toString() de la clase base con super y añade la autonomía
    return super.toString() + `Autonomía: ${this.autonomia} horas\n`;
  }
}

// Crear objetos de tipo Ordenador
const o1 = new Ordenador("HP", "EliteDisplay", 8, 256, 23);
const o2 = new Ordenador("Dell", "Inspiron AIO");

// Crear objetos de tipo Portatil
const p1 = new Portatil("Apple", "Macbook Air", 8, 128, 13, 12);
const p2 = new Portatil("Acer", "Aspire");

// Mostrar la información de cada objeto
console.log(o1.toString());
console.log(o2.toString());
console.log(p1.toString());
console.log(p2.toString());
