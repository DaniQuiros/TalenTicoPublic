const tbody = document.querySelector("#table-invitaciones-enviadas tbody");

//let empleoid = localStorage.getItem("_idmongo")

const mostrar_datos_en_tabla = async() => {
    let empleoid= "1234578"
    listado_de_invitaciones = await listar_invitaciones_empleo(empleoid);
    console.log(listado_de_invitaciones)

    
    tbody.innerHTML = "";
    
    let head = tbody.insertRow()
    puesto = head.insertCell();
    puesto.innerHTML = "Correo";
    puesto.classList.add("talentico-th");
    estado = head.insertCell();
    estado.innerHTML = "Puesto";
    estado.classList.add("talentico-th");
    for (let i = 0; i < listado_de_invitaciones.length; i++) {
        let fila = tbody.insertRow()
        fila.classList.add("talentico-tr");
        let celda_puesto = fila.insertCell();
        celda_puesto.innerHTML = listado_de_invitaciones[i]["candidato"];
        celda_puesto.classList.add("talentico-td");
    
        let celda_estado = fila.insertCell();
        celda_estado.innerHTML = listado_de_invitaciones[i]["puesto"];
        celda_estado.classList.add("talentico-td");
    }

}

mostrar_datos_en_tabla()

