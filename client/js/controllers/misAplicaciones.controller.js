const tbody = document.querySelector("#table-misAplicaciones tbody");

let candidato = sessionStorage.getItem("correo")

const mostrar_datos_en_tabla = async() => {
    
    listado_de_aplicaciones = await listar_aplicaciones(candidato);
    console.log(listado_de_aplicaciones)
    
    tbody.innerHTML = "";
    
    let head = tbody.insertRow()
    puesto = head.insertCell();
    puesto.innerHTML = "Puesto";
    puesto.classList.add("talentico-th");
    estado = head.insertCell();
    estado.innerHTML = "Estado";
    estado.classList.add("talentico-th");
    for (let i = 0; i < listado_de_aplicaciones.length; i++) {
        let fila = tbody.insertRow()
        fila.classList.add("talentico-tr");
        let celda_puesto = fila.insertCell();
        celda_puesto.innerHTML = listado_de_aplicaciones[i]["puesto"];
        celda_puesto.classList.add("talentico-td");
    
        let celda_estado = fila.insertCell();
        celda_estado.innerHTML = listado_de_aplicaciones[i]["estado"];
        celda_estado.classList.add("talentico-td");
    }

}

mostrar_datos_en_tabla()

