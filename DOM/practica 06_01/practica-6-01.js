// =========================================================================
// BLOQUE DE INICIALIZACIÓN: ELIMINADO.
// La inicialización ahora se realiza mediante llamadas directas desde el HTML (onload="iniciar()").
// =========================================================================

/**
 * Función 'iniciar' vacía. La lógica de adjuntar eventos se ha movido
 * a las llamadas directas en el HTML (onclick, onchange).
 */
function iniciar() {
  // Se eliminó todo el código de adjunción de eventos.
}

/**
 * Cierra el diálogo modal principal (ID: "dialogo").
 */
function cerrar() {
  document.getElementById("dialogo").removeAttribute("open");
}

/**
 * Cierra el diálogo modal secundario (ID: "dialogo1").
 */
function msgcerrar() {
  document.getElementById("dialogo1").removeAttribute("open");
}

/**
 * Añade una nueva definición a una lista de descripciones (<dl>).
 */
function nuevadefinicion() {
  var define = document.getElementById("defines");
  var textoTer = document.getElementById("palabra").value;
  var textoDef = document.getElementById("concepto").value;
  var todosTer = define.getElementsByTagName("dt");
  var VboInexiste = true;
  var VnbIndice = 0;

  while (VboInexiste && VnbIndice < todosTer.length) {
    if (todosTer.item(VnbIndice).textContent == textoTer) {
      var defi = document.createElement("dd");
      var vdefi = document.createTextNode(textoDef);
      defi.appendChild(vdefi);
      define.insertBefore(defi, todosTer.item(VnbIndice + 1));
      VboInexiste = false;
    }
    VnbIndice += 1;
  }

  if (VboInexiste) {
    var ter = document.createElement("dt");
    var vter = document.createTextNode(textoTer);
    var defi = document.createElement("dd");
    var vdefi = document.createTextNode(textoDef);

    ter.appendChild(vter);
    defi.appendChild(vdefi);

    define.appendChild(ter);
    define.appendChild(defi);
  }
}

/**
 * Añade una nueva localidad a una lista no ordenada (<ul>), en orden alfabético.
 */
function nuevaLocalidad() {
  var lista = document.getElementById("locas");
  var todos = lista.getElementsByTagName("li");
  var nuevo = document.getElementById("localidad").value;
  var encontrado = false;
  var indice = 0;

  while (!encontrado && indice < todos.length) {
    var elemento = todos.item(indice);
    if (elemento.textContent == nuevo) encontrado = true;
    else if (elemento.textContent > nuevo) {
      var otro = document.createElement("li");
      var votro = document.createTextNode(nuevo);
      otro.appendChild(votro);
      lista.insertBefore(otro, elemento);
      encontrado = true;
    }
    indice += 1;
  }

  if (!encontrado) {
    var otro = document.createElement("li");
    var votro = document.createTextNode(nuevo);
    otro.appendChild(votro);
    lista.appendChild(otro);
  }
}

/** Función auxiliar para construir una fila (<tr>). */
function obtenerLinea() {
  var vmarca = document.getElementById("marca").value;
  var vmodel = document.getElementById("modelo").value;
  var vprecio = document.getElementById("precio").value;

  var linea = document.createElement("tr");
  var elmar = document.createElement("td");
  var elmod = document.createElement("td");
  var elpre = document.createElement("td");

  var nomar = document.createTextNode(vmarca);
  var nomod = document.createTextNode(vmodel);
  var nopre = document.createTextNode(vprecio);

  elmar.appendChild(nomar);
  elmod.appendChild(nomod);
  elpre.appendChild(nopre);

  linea.appendChild(elmar);
  linea.appendChild(elmod);
  linea.appendChild(elpre);
  return linea;
}

/** Añade o actualiza la información de un coche en la tabla. */
function compraCoche() {
  var vmarca = document.getElementById("marca").value;
  var vmodel = document.getElementById("modelo").value;
  var vprecio = document.getElementById("precio").value;

  var cuerpo = document.querySelector("#coches tbody");
  var todos = cuerpo.getElementsByTagName("tr");
  var encontrado = false;
  var indice = 0;

  while (!encontrado && indice < todos.length) {
    var elemento = todos.item(indice);
    var filas = elemento.getElementsByTagName("td");

    if (vmarca > filas.item(0).textContent) {
      var linea = obtenerLinea();
      cuerpo.insertBefore(linea, elemento);
      encontrado = true;
    } else if (
      vmarca == filas.item(0).textContent &&
      vmodel > filas.item(1).textContent
    ) {
      var linea = obtenerLinea();
      cuerpo.insertBefore(linea, elemento);
      encontrado = true;
    } else if (
      vmarca == filas.item(0).textContent &&
      vmodel == filas.item(1).textContent
    ) {
      filas.item(2).textContent = vprecio;
      encontrado = true;
    }
    indice += 1;
  }

  if (!encontrado) {
    var linea = obtenerLinea();
    cuerpo.appendChild(linea);
  }
}

/**
 * Actualiza el selector de provincias y un párrafo descriptivo.
 */
function ponerProvincias() {
  // =========================================================================
  // DEFINICIÓN DE DATOS: Arrays de provincias y textos descriptivos por C.A.
  // Se mantienen para la lógica del programa.
  // =========================================================================
  var galicia = new Array("A Coruña", "Lugo", "Orense", "Pontevedra");
  var tgalicia = "Galicia es famosa por su marisco";
  var asturias = new Array("Oviedo");
  var tasturias = "Asturias con sus picos de europa";
  var cantabria = new Array("Santander");
  var tcantabria = "Cantabria y sus anchoas";
  var vasco = new Array("Alava", "Guipuzcoa", "Vizcaya");
  var tvasco = "Los pinchos de sus tabernas";
  var navarra = new Array("Pamplona");
  var tnavarra = "Navarra y sus esparragos";
  var aragon = new Array("Huesca", "Teruel", "Zaragoza");
  var taragon = "aragon ";
  var catalunia = new Array("Barcelona", "Girona", "Lleida", "Tarragona");
  var tcatalunia = "En cataluña la sardana";
  var castillaleon = new Array(
    "Avila",
    "Burgos",
    "León",
    "Palencia",
    "Salamanca",
    "Segovia",
    "Soria",
    "Valladolid",
    "Zamora"
  );
  var tcastillaleon = "El cordero asado";
  var madrid = new Array("Madrid");
  var tmadrid = "Capital del estado";
  var castillamancha = new Array(
    "Albacete",
    "Ciudad Real",
    "Cuenca",
    "Guadalajara",
    "Toledo"
  );
  var tcastillamancha = "Castilla-la Mancha y sus molinos";
  var valencia = new Array("Alicante", "Castellón de la Plana", "Valencia");
  var tvalencia = "Valencia y sus naranjas";
  var extremadura = new Array("Badajoz", "Caceres");
  var textremadura = "Las bellotas de extremadura";
  var rioja = new Array("Logroño");
  var trioja = "En la rioja el vino";
  var murcia = new Array("Murcia");
  var tmurcia = "Murcia y la manga del mar menor";
  var baleares = new Array("Palma de Mallorca");
  var tbaleares = "Las baleares y sus calas";
  var canarias = new Array(
    "Las Palmas de Gran Canaria",
    "Santa Cruz de Tenerife"
  );
  var tcanarias = "Las islas afortunadas por su clima";
  var andalucia = new Array(
    "Almeria",
    "Cadiz",
    "Cordoba",
    "Granada",
    "Huelva",
    "Jaen",
    "Malaga",
    "Sevilla"
  );
  var tandalucia = "En andalucia el aceite de oliva";
  var ceuta = new Array("Ceuta");
  var tceuta = "En pleno Africa";
  var melilla = new Array("Melilla");
  var tmelilla = "Al norte de Africa";
  // =========================================================================

  var vcomun = document.getElementById("comunidades").value;
  var provin = document.getElementById("provincias");
  var texto = document.getElementById("parrafo");

  // 1. Eliminar opciones de provincia existentes
  var elementos = provin.getElementsByTagName("option");
  for (var i = elementos.length - 1; i >= 0; i--) {
    provin.removeChild(elementos.item(i));
  }

  // 2. Llenar el selector de provincias
  var tabla = eval(vcomun);
  for (var i = 0; i < tabla.length; i++) {
    var nuevo = document.createElement("option");
    var vnue = document.createTextNode(tabla[i]);
    nuevo.appendChild(vnue);
    provin.appendChild(nuevo);
  }

  // 3. Actualizar el párrafo de texto
  var contenido = eval("t" + vcomun);
  texto.textContent = contenido;
}

/**
 * Abre el diálogo modal de registro.
 * **Asigna directamente la función 'crearcookie' al onclick del botón Aceptar.**
 */
function registrouser() {
  document.getElementById("dialogo").setAttribute("open", "true");
  var botaceptar = document.getElementById("btnaceptar");

  // REEMPLAZO: Asignación directa del onclick
  botaceptar.setAttribute("onclick", "crearcookie()");
}

/**
 * Valida los datos de registro, crea la cookie, y cierra el diálogo.
 * **Limpia el atributo onclick del botón Aceptar.**
 */
function crearcookie() {
  var VstNom = document.getElementById("frmusuario").value.trim();
  var VstPas = document.getElementById("frmcontra").value.trim();
  var VobErNom = /^[a-záéóúüñ]{3}[a-záéóúüñ0-9]{5,9}$/i;
  var VobErPas = /^[a-záéóúüñ]{2}[a-záéóúüñ0-9_]{5,11}[a-záéóúüñ0-9]$/i;

  if (VobErNom.test(VstNom) && VobErPas.test(VstPas)) {
    document.cookie =
      VstNom + "=" + VstPas + ";expires=true, 22 Jan 2030 00:00:00 GMT; ";
  } else {
    alert("No cumplen las normas");
  }

  document.getElementById("frmusuario").value = "";
  document.getElementById("frmcontra").value = "";

  // REEMPLAZO: Limpiar el onclick del botón Aceptar
  var botaceptar = document.getElementById("btnaceptar");
  botaceptar.removeAttribute("onclick");

  document.getElementById("dialogo").removeAttribute("open");
}

/**
 * Abre el diálogo modal de login.
 * **Asigna directamente la función 'validaruser' al onclick del botón Aceptar.**
 */
function entrarsesion() {
  document.getElementById("dialogo").setAttribute("open", "true");
  var botaceptar = document.getElementById("btnaceptar");

  // REEMPLAZO: Asignación directa del onclick
  botaceptar.setAttribute("onclick", "validaruser()");
}

/**
 * Valida el usuario y contraseña contra las cookies.
 * **Cambia dinámicamente el onclick del botón Entrar a 'cerrarSS()'.**
 * **Limpia el atributo onclick del botón Aceptar.**
 */
function validaruser() {
  var VstNom = document.getElementById("frmusuario").value.trim();
  var VstPas = document.getElementById("frmcontra").value.trim();
  var cadena = document.cookie;

  if (VstNom.length > 0) {
    var posicion = cadena.indexOf(VstNom);

    if (posicion != -1) {
      var pos2 = cadena.indexOf("=", posicion + 1);
      var pos3 = cadena.indexOf(";", pos2 + 1);

      if (pos3 == -1) {
        pos3 = cadena.length;
      }

      var VstLeido = cadena.substring(pos2 + 1, pos3);

      if (VstLeido == VstPas) {
        // **Login Exitoso**
        document.getElementById("usuario").value = VstNom;
        document.getElementById("nuevomen").disabled = false;
        document.getElementById("entrar").value = "Cerrar Sesion";

        var sexto = document.getElementById("entrar");
        // REEMPLAZO: Cambiar el onclick del botón 'Entrar' a 'Cerrar Sesion'
        sexto.setAttribute("onclick", "cerrarSS()");
      } else alert("Usuario y/o contraseña erroneos");
    } else alert("No se ha registrado ese usuario");
  } else alert("No ha introducido el nombre del usuario");

  document.getElementById("frmusuario").value = "";
  document.getElementById("frmcontra").value = "";

  // REEMPLAZO: Limpiar el onclick del botón Aceptar
  var botaceptar = document.getElementById("btnaceptar");
  botaceptar.removeAttribute("onclick");

  document.getElementById("dialogo").removeAttribute("open");
}

/**
 * Cierra la sesión de usuario.
 * **Cambia dinámicamente el onclick del botón Entrar a 'entrarsesion()'.**
 */
function cerrarSS() {
  document.getElementById("usuario").value = "";
  document.getElementById("entrar").value = "Entrar";
  document.getElementById("nuevomen").disabled = true;

  var sexto = document.getElementById("entrar");
  // REEMPLAZO: Restaurar el onclick del botón 'Entrar' a 'Entrar Sesion'
  sexto.setAttribute("onclick", "entrarsesion()");
}

/**
 * Abre el diálogo modal para la creación de un nuevo mensaje de chat.
 */
function mensajenuevo() {
  document.getElementById("dialogo1").setAttribute("open", "true");
}

/**
 * Crea un nuevo elemento de mensaje y lo inserta en el contenedor principal.
 */
function crearmensa() {
  var padre = document.getElementById("chat");
  var VstTitulo = document.getElementById("tit").value;
  var VstMensaje = document.getElementById("msg").value;
  var VstUsuario = document.getElementById("usuario").value;
  var VobDia = document.getElementById("dialogo1");
  var VobImages = VobDia.querySelectorAll("input[type='radio']");
  var VstImages;

  for (var VnbIndice = 0; VnbIndice < VobImages.length; VnbIndice++) {
    if (VobImages.item(VnbIndice).checked)
      VstImages = VobImages.item(VnbIndice).value;
  }

  var VobPrimero = document.createElement("div");

  var VobHijo01 = document.createElement("div");
  var VobImagen1 = document.createElement("img");
  VobImagen1.setAttribute("src", VstImages);
  VobHijo01.appendChild(VobImagen1);
  var VobTexto1 = document.createElement("span");
  var VobNieto1 = document.createTextNode(VstUsuario);
  VobTexto1.appendChild(VobNieto1);
  VobTexto1.setAttribute("class", "usar");
  VobHijo01.appendChild(VobTexto1);

  var VobHijo02 = document.createElement("div");
  var VobTexto02 = document.createTextNode(VstTitulo);
  VobHijo02.appendChild(VobTexto02);

  var VobHijo03 = document.createElement("div");
  var VobTexto03 = document.createTextNode(VstMensaje);
  VobHijo03.appendChild(VobTexto03);

  VobPrimero.appendChild(VobHijo01);
  VobPrimero.appendChild(VobHijo02);
  VobPrimero.appendChild(VobHijo03);

  var VobUltimo = document.getElementById("nuevomen");
  padre.insertBefore(VobPrimero, VobUltimo);

  document.getElementById("tit").value = "";
  document.getElementById("msg").value = "";
  for (var VnbIndice = 0; VnbIndice < VobImages.length; VnbIndice++) {
    VobImages.item(VnbIndice).checked = false;
  }
  document.getElementById("dialogo1").removeAttribute("open");
}
