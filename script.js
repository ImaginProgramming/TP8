// TP8 - Gestor Automotor

// Cargar datos de localStorage o iniciar listas vacías si no existen
let conductores = JSON.parse(localStorage.getItem("conductores_db")) || [];
let vehiculos = JSON.parse(localStorage.getItem("vehiculos_db")) || [];

// Función auxiliar para guardar en localStorage
function guardarConductores() {
    localStorage.setItem("conductores_db", JSON.stringify(conductores));
}

function guardarVehiculos() {
    localStorage.setItem("vehiculos_db", JSON.stringify(vehiculos));
}


function agregarConductor() {
    let nombre = document.getElementById("conductor-nombre").value.trim();
    let edadTexto = document.getElementById("conductor-edad").value.trim();
    let tipo_carnet = document.getElementById("conductor-tipo-carnet").value;
    let seguro = document.getElementById("conductor-seguro").value;

    if (nombre == "" || edadTexto == "") {
        alert("Por favor complete todos los campos del conductor.");
        return;
    }

    let edad = parseInt(edadTexto, 10);
    if (isNaN(edad) || edad <= 0) {
        alert("Por favor ingrese una edad válida mayor a 0.");
        return;
    }

    let nuevoConductor = {
        nombre: nombre,
        edad: edad,
        tipo_carnet: tipo_carnet,
        seguro: seguro
    };

    conductores.push(nuevoConductor);
    guardarConductores();

    alert("Conductor agregado con éxito.");
    limpiarFormularioConductor();
}

function limpiarFormularioConductor() {
    document.getElementById("conductor-nombre").value = "";
    document.getElementById("conductor-edad").value = "";
    document.getElementById("conductor-tipo-carnet").value = "A1";
    document.getElementById("conductor-seguro").value = "SI";
}

function mostrarConductores() {
    let filtroSeguro = document.getElementById("filtro-conductor-seguro").value;
    let filtroCarnet = document.getElementById("filtro-conductor-carnet").value;
    let cuerpoTabla = document.getElementById("cuerpo-tabla-conductores");

    let filasHtml = "";
    let cantidadCoincidencias = 0;

    for (let i = 0; i < conductores.length; i++) {
        let conductor = conductores[i];

        let coincideSeguro = (filtroSeguro == "Todos" || conductor.seguro == filtroSeguro);
        let coincideCarnet = (filtroCarnet == "Todos" || conductor.tipo_carnet == filtroCarnet);

        if (coincideSeguro && coincideCarnet) {
            cantidadCoincidencias++;
            filasHtml += "<tr>" +
                "<td>" + conductor.nombre + "</td>" +
                "<td>" + conductor.edad + "</td>" +
                "<td>" + conductor.tipo_carnet + "</td>" +
                "<td>" + conductor.seguro + "</td>" +
                "</tr>";
        }
    }

    if (cantidadCoincidencias == 0) {
        filasHtml = "<tr><td>No se encontraron conductores.</td><td></td><td></td><td></td></tr>";
    }

    cuerpoTabla.innerHTML = filasHtml;
}

function agregarVehiculo() {
    let marca = document.getElementById("vehiculo-marca").value.trim();
    let modelo = document.getElementById("vehiculo-modelo").value.trim();
    let patente = document.getElementById("vehiculo-patente").value.trim();
    let tipo = document.getElementById("vehiculo-tipo").value;

    if (marca == "" || modelo == "" || patente == "") {
        alert("Por favor complete todos los campos del vehículo.");
        return;
    }

    let nuevoVehiculo = {
        marca: marca,
        modelo: modelo,
        patente: patente,
        tipo: tipo
    };

    vehiculos.push(nuevoVehiculo);
    guardarVehiculos();

    alert("Vehículo agregado con éxito.");
    limpiarFormularioVehiculo();
}

function limpiarFormularioVehiculo() {
    document.getElementById("vehiculo-marca").value = "";
    document.getElementById("vehiculo-modelo").value = "";
    document.getElementById("vehiculo-patente").value = "";
    document.getElementById("vehiculo-tipo").value = "A1";
}

function actualizarDesplegableMarcas() {
    let selectMarca = document.getElementById("filtro-vehiculo-marca");
    let seleccionPrevia = selectMarca.value || "Todos";

    let marcasUnicas = [];

    for (let i = 0; i < vehiculos.length; i++) {
        let marcaActual = vehiculos[i].marca;
        let yaExiste = false;

        for (let j = 0; j < marcasUnicas.length; j++) {
            if (marcasUnicas[j].toLowerCase() == marcaActual.toLowerCase()) {
                yaExiste = true;
                break;
            }
        }

        if (!yaExiste) {
            marcasUnicas.push(marcaActual);
        }
    }

    let opcionesHtml = '<option value="Todos">Todos</option>';
    for (let k = 0; k < marcasUnicas.length; k++) {
        opcionesHtml += '<option value="' + marcasUnicas[k] + '">' + marcasUnicas[k] + '</option>';
    }
    selectMarca.innerHTML = opcionesHtml;

    let sigueExistiendo = false;
    for (let m = 0; m < marcasUnicas.length; m++) {
        if (marcasUnicas[m].toLowerCase() == seleccionPrevia.toLowerCase()) {
            sigueExistiendo = true;
            selectMarca.value = marcasUnicas[m];
            break;
        }
    }

    if (!sigueExistiendo) {
        selectMarca.value = "Todos";
    }
}

function mostrarVehiculos() {
    let filtroMarca = document.getElementById("filtro-vehiculo-marca").value;
    let filtroTipo = document.getElementById("filtro-vehiculo-tipo").value;
    let cuerpoTabla = document.getElementById("cuerpo-tabla-vehiculos");

    let filasHtml = "";
    let cantidadCoincidencias = 0;

    for (let i = 0; i < vehiculos.length; i++) {
        let vehiculo = vehiculos[i];

        let coincideMarca = (filtroMarca == "Todos" || vehiculo.marca.toLowerCase() == filtroMarca.toLowerCase());
        let coincideTipo = (filtroTipo == "Todos" || vehiculo.tipo == filtroTipo);

        if (coincideMarca && coincideTipo) {
            cantidadCoincidencias++;
            filasHtml += "<tr>" +
                "<td>" + vehiculo.marca + "</td>" +
                "<td>" + vehiculo.modelo + "</td>" +
                "<td>" + vehiculo.patente + "</td>" +
                "<td>" + vehiculo.tipo + "</td>" +
                "</tr>";
        }
    }

    if (cantidadCoincidencias == 0) {
        filasHtml = "<tr><td>No se encontraron vehículos.</td><td></td><td></td><td></td></tr>";
    }

    cuerpoTabla.innerHTML = filasHtml;
}


// Ejecución condicional dependiendo de la página en la que estemos
if (document.getElementById("cuerpo-tabla-conductores")) {
    mostrarConductores();
}

if (document.getElementById("cuerpo-tabla-vehiculos")) {
    actualizarDesplegableMarcas();
    mostrarVehiculos();
}
