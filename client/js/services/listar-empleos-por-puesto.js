const tbody = document.querySelector("#ListaEmpleosTabla tbody");
const input_filtro_empresa = document.querySelector("#inp-empresa");
const input_filtro_puesto = document.querySelector("#inp-profesion");
const input_filtro_rango = document.querySelector("#inp-rango");
const input_filtro_requisitos = document.querySelector("#inp-requisitos");

let listado_empleos = [];

function crear_boton(fila,i){
    
    //crear un boton de editar para cada registro
    let celda_acciones = fila.insertCell();
    //crear un boton
    let boton_detalles = document.createElement("button");
    //afectar el contenido del botón
    boton_detalles.innerText = "Ver Detalles";
    
    //agregamos un evento al botón
    boton_detalles.addEventListener("click", () => {
        localStorage.setItem("_id", listado_empleos[i]._id);
        window.location.href = "empleosPlantilla.html";
    })

    celda_acciones.appendChild(boton_detalles)
}


const mostrar_datos_en_tabla = async() => {
    listado_empleos = await listar_empleo_BD();

    tbody.innerHTML = "";

    for (let i = 0; i < listado_empleos.length; i++) {
        let fila = tbody.insertRow();

        let celda_empresa = (fila.insertCell().innerHTML = listado_empleos[i]["empresaNombre"]);
        let celda_puesto = (fila.insertCell().innerHTML = listado_empleos[i]["nombrePuesto"]);
        let celda_rangoSalario = (fila.insertCell().innerHTML = listado_empleos[i]["rangoSalario"]);
        let celda_requisitos = (fila.insertCell().innerHTML = listado_empleos[i]["requisitos"]);

        crear_boton(fila,i)

    }
}


function filtrar_datos() {
    tbody.innerHTML = "";
    let filtroEmpresa = input_filtro_empresa.value;
    let filtroPuesto = input_filtro_puesto.value.toLowerCase();
    let filtroRango = input_filtro_rango.value;
    let filtroRequisitos = input_filtro_requisitos.value.toLowerCase();
    
    let coincidencias = false;

    for (let i = 0; i < listado_empleos.length; i++) {
        let empresa = listado_empleos[i]["empresaNombre"];
        let puesto = listado_empleos[i]["nombrePuesto"].toLowerCase();
        let rangoSalario = listado_empleos[i]["rangoSalario"];
        let requisitos = listado_empleos[i]["requisitos"].toLowerCase();

        if (empresa.includes(filtroEmpresa) || puesto.includes(filtroPuesto) || rangoSalario.includes(filtroRango) || requisitos.includes(filtroRequisitos)) {
            let fila = tbody.insertRow();

            let celdaEmpresa = fila.insertCell();
            celdaEmpresa.innerHTML = listado_empleos[i]["empresaNombre"];

            let celdaNombre = fila.insertCell();
            celdaNombre.innerHTML = listado_empleos[i]["nombrePuesto"];
            
            let celdaRangoSalario = fila.insertCell();
            celdaRangoSalario.innerHTML = listado_de_usuarios[i]["rangoSalario"];
            
            let celdaRequisitos = fila.insertCell();
            celdaRequisitos.innerHTML = listado_de_usuarios[i]["requisitos"];

            crear_boton(fila,i)

            coincidencias = true;
        }
    }

    if (coincidencias === false) {
        let fila = tbody.insertRow();
        let celdaMensaje = fila.insertCell();
        celdaMensaje.colSpan = 5;
        celdaMensaje.innerHTML = "No se encontraron registros para esta búsqueda";
    }
}



mostrar_datos_en_tabla();

input_filtro.addEventListener("keyup", filtrar_datos);