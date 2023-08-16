const notificaciones = document.querySelector("#notificaciones ");

//let candidato = sessionStorageStorage.getItem("cedula")

const mostrar_datos_en_tabla = async() => {
    let usuario = "daniela@maikol.com"
    listado_de_notificaciones = await listar_aplicaciones(usuario);
    console.log(listado_de_notificaciones)

    
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