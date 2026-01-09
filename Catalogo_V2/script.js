document.addEventListener('DOMContentLoaded', () => {

    // =========================
    // 1. ESTADO INICIAL
    // =========================
    const productos = [];

    // =========================
    // 2. VALIDADORES
    // =========================
    const Validators = {
        isEmpty: val => !val || val.trim() === '',
        isDuplicate: (val, lista) => lista.some(p => p.id === val),
        isInvalidNumber: val => {
            if (!val || val.trim() === '') return true;
            const num = Number(val);
            return !Number.isFinite(num) || num < 0;
        },
        isValidImageUrl: url => {
            return new Promise(resolve => {
                if (!url || url.trim() === '') return resolve(false);
                const img = new Image();
                img.onload = () => resolve(true);
                img.onerror = () => resolve(false);
                img.src = url;
            });
        }
    };

    // =========================
    // 3. DOM
    // =========================
    const DOM = {
        form: document.getElementById('formulario_producto'),
        btnToggle: document.getElementById('btn_toggle_form'),
        grid: document.getElementById('grid_productos'),
        contador: document.getElementById('contador_productos'),
        status: document.getElementById('status_peticion'),
        detalle: document.getElementById('info_contenido'),

        id: document.getElementById('id'),
        nombre: document.getElementById('nombre'),
        descripcion: document.getElementById('descripcion'),
        precio: document.getElementById('precio'),
        imagen: document.getElementById('ruta_imagen'),
        preview: document.getElementById('preview'), // opcional
        btnConfirmar: document.getElementById('btn_confirmar')
    };

    // =========================
    // 4. CONFIGURACIÓN VALIDACIÓN
    // =========================
    function getFormConfig() {
        return [
            {
                el: DOM.id,
                errId: 'error-id',
                rules: [
                    { check: () => Validators.isEmpty(DOM.id.value), msg: 'Campo obligatorio' },
                    { check: () => Validators.isDuplicate(DOM.id.value, productos), msg: 'ID duplicado' }
                ]
            },
            {
                el: DOM.nombre,
                errId: 'error-nombre',
                rules: [
                    { check: () => Validators.isEmpty(DOM.nombre.value), msg: 'Campo obligatorio' }
                ]
            },
            {
                el: DOM.precio,
                errId: 'error-precio',
                rules: [
                    { check: () => Validators.isInvalidNumber(DOM.precio.value), msg: 'Precio inválido o negativo' }
                ]
            }
        ];
    }

    // =========================
    // 5. FUNCIONES DE MARCADO DE ERRORES
    // =========================
    function marcarError(input, spanId, msg) {
        input.style.borderColor = 'red';
        document.getElementById(spanId).textContent = msg;
    }

    function limpiarError(input, spanId) {
        input.style.borderColor = '';
        document.getElementById(spanId).textContent = '';
    }

    // =========================
    // 6. VALIDACIÓN FORMULARIO COMPLETO (para enviar)
    // =========================
    async function validarFormulario() {
        let valido = true;

        getFormConfig().forEach(campo => {
            const error = campo.rules.find(r => r.check());
            if (error) {
                marcarError(campo.el, campo.errId, error.msg);
                valido = false;
            } else {
                limpiarError(campo.el, campo.errId);
            }
        });

        const imgOk = await Validators.isValidImageUrl(DOM.imagen.value);
        if (!imgOk) {
            marcarError(DOM.imagen, 'error-imagen', 'Imagen no válida o no accesible');
            valido = false;
        } else {
            limpiarError(DOM.imagen, 'error-imagen');
        }

        return valido;
    }

    // =========================
    // 7. VALIDACIÓN SOLO CHECK PARA BOTÓN
    // =========================
    async function formularioValidoSoloCheck() {
        let valido = true;

        getFormConfig().forEach(campo => {
            if (campo.rules.some(r => r.check())) valido = false;
        });

        if (!DOM.imagen.value || !(await Validators.isValidImageUrl(DOM.imagen.value))) {
            valido = false;
        }

        return valido;
    }

    // =========================
    // 8. ACTUALIZAR ESTADO BOTÓN
    // =========================
    async function actualizarEstadoBoton() {
        DOM.btnConfirmar.disabled = !(await formularioValidoSoloCheck());
    }

    // =========================
    // 9. VALIDAR CAMPOS Y MARCAR ERRORES (para mostrar formulario o limpiar)
    // =========================
    async function validarCamposConErrores() {
        for (const campo of getFormConfig()) {
            const error = campo.rules.find(r => r.check());
            if (error) {
                marcarError(campo.el, campo.errId, error.msg);
            } else {
                limpiarError(campo.el, campo.errId);
            }
        }

        if (!DOM.imagen.value || !(await Validators.isValidImageUrl(DOM.imagen.value))) {
            marcarError(DOM.imagen, 'error-imagen', 'Imagen no válida o no accesible');
        } else {
            limpiarError(DOM.imagen, 'error-imagen');
        }

        actualizarEstadoBoton();
    }

    // =========================
    // 10. EVENTOS DE INPUT (validación en tiempo real)
    // =========================
    [DOM.id, DOM.nombre, DOM.precio, DOM.imagen].forEach(input => {
        input.addEventListener('input', async () => {
            const campoConfig = getFormConfig().find(c => c.el === input);
            if (campoConfig) {
                const error = campoConfig.rules.find(r => r.check());
                if (error) marcarError(input, campoConfig.errId, error.msg);
                else limpiarError(input, campoConfig.errId);
            }

            if (input === DOM.imagen) {
                const imgOk = await Validators.isValidImageUrl(DOM.imagen.value);
                if (!imgOk) marcarError(DOM.imagen, 'error-imagen', 'Imagen no válida o no accesible');
                else limpiarError(DOM.imagen, 'error-imagen');
            }

            actualizarEstadoBoton();
        });
    });

    // =========================
    // 11. TOGGLE FORMULARIO (valida al abrir)
    // =========================
    DOM.btnToggle.onclick = async () => {
        if (DOM.form.style.display === 'block') {
            DOM.form.style.display = 'none';
        } else {
            DOM.form.style.display = 'block';
            await validarCamposConErrores(); // valida los campos vacíos cada vez que se abre
        }
    };

    // =========================
    // 12. SIMULACIÓN SERVIDOR
    // =========================
    function simularServidor(producto) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const exito = Math.random() < 0.8; // 80% de acierto
                if (exito) resolve({ mensaje: 'Producto guardado con éxito' });
                else reject({ mensaje: 'Error al guardar el producto en el servidor' });
            }, 1000);
        });
    }

    // =========================
    // 13. INTENTAR AGREGAR PRODUCTO
    // =========================
    async function intentarAgregar() {
        const esValido = await validarFormulario();
        if (!esValido) return;

        DOM.btnConfirmar.disabled = true;
        DOM.status.textContent = 'Guardando en inventario...';

        try {
            const respuesta = await simularServidor({
                id: DOM.id.value,
                nombre: DOM.nombre.value,
                descripcion: DOM.descripcion.value,
                precio: Number(DOM.precio.value),
                imagen: DOM.imagen.value
            });

            DOM.status.textContent = respuesta.mensaje;
            agregarProducto();
            limpiarFormulario();
            DOM.form.style.display = 'none';

        } catch (error) {
            DOM.status.textContent = error.mensaje;
        } finally {
            actualizarEstadoBoton();
        }
    }

    // =========================
    // 14. CREAR PRODUCTO Y TARJETA
    // =========================
    function agregarProducto() {
        const producto = {
            id: DOM.id.value,
            nombre: DOM.nombre.value,
            descripcion: DOM.descripcion.value,
            precio: Number(DOM.precio.value),
            imagen: DOM.imagen.value
        };

        productos.push(producto);
        crearTarjeta(producto);
        DOM.contador.textContent = productos.length;
    }

    function crearTarjeta(producto) {
        const card = document.createElement('div');
        card.className = 'producto-card';
        card.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <div class="nombre-overlay">${producto.nombre}</div>
        `;
        card.onclick = () => mostrarDetalle(producto, card);
        DOM.grid.appendChild(card);
    }

    function mostrarDetalle(producto, cardSeleccionada) {
        document.querySelectorAll('.producto-card').forEach(c => c.classList.remove('activo'));
        cardSeleccionada.classList.add('activo');

        DOM.detalle.innerHTML = `
            <h4>${producto.nombre}</h4>
            <p><b>ID:</b> ${producto.id}</p>
            <p><b>Precio:</b> €${producto.precio}</p>
            <p><b>Descripción:</b> ${producto.descripcion || '—'}</p>
            <img src="${producto.imagen}" width="80">
        `;
    }

    // =========================
    // 15. LIMPIAR FORMULARIO
    // =========================
    function limpiarFormulario() {
        DOM.id.value = '';
        DOM.nombre.value = '';
        DOM.descripcion.value = '';
        DOM.precio.value = '';
        DOM.imagen.value = '';
        if (DOM.preview) DOM.preview.src = '';

        validarCamposConErrores(); // marca errores al limpiar
    }

    // =========================
    // 16. CLICK BOTÓN CONFIRMAR
    // =========================
    DOM.btnConfirmar.addEventListener('click', intentarAgregar);

    // =========================
    // 17. VALIDACIÓN INICIAL AL CARGAR
    // =========================
    validarCamposConErrores();

});
