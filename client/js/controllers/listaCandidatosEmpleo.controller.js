const tbody_candidatos = document.querySelector("#table-candidatos tbody")
const tbody = document.querySelector("#table-invitaciones-enviadas tbody")

//let empleoid = localStorage.getItem("_idmongo")








function crear_botones(lista,fila,i){
    
    //crear un boton de editar para cada registro
    let celda_acciones = fila.insertCell();
    //crear un boton
    let boton_editar = document.createElement("button");
    //afectar el contenido del botón
    boton_editar.innerText = "Editar";
    boton_editar.classList.add('talentico-button')

    //agregamos un evento al botón
    boton_editar.addEventListener("click", () => {
        //console.log(listado_de_usuarios[i]._id);
        //localStorage.setItem("id_mongo", listado_de_usuarios[i]._id)
        localStorage.setItem("id_mongo", lista[i]._id);
        window.location.href = "editar-persona.html";

    })
    celda_acciones.appendChild(boton_editar)

}






let empleoid= "1234578"














const mostrar_datos_en_tabla_invitaciones = async() => {


    


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





const mostrar_datos_en_tabla_candidatos = async() => {
    listado_de_candidatos = await listar_candidatos_empleo(empleoid);
    console.log(listado_de_candidatos)
    
    
    tbody.innerHTML = "";
    
    let head_cand = tbody_candidatos.insertRow()
    puesto = head.insertCell();
    puesto.innerHTML = "Correo";
    puesto.classList.add("talentico-th");
    estado = head.insertCell();
    estado.innerHTML = "Puesto";
    estado.classList.add("talentico-th");
    for (let i = 0; i < listado_de_invitaciones.length; i++) {
        let fila = tbody_candidatos.insertRow()
        fila.classList.add("talentico-tr");
        let celda_puesto = fila.insertCell();
        celda_puesto.innerHTML = listado_de_invitaciones[i]["candidato"];
        celda_puesto.classList.add("talentico-td");
    
        let celda_estado = fila.insertCell();
        celda_estado.innerHTML = listado_de_invitaciones[i]["puesto"];
        celda_estado.classList.add("talentico-td");
    }
}








mostrar_datos_en_tabla_invitaciones()



 

