const tbody_candidatos = document.querySelector("#table-candidatos tbody")
const tbody = document.querySelector("#table-invitaciones-enviadas tbody")


let empleoid = localStorage.getItem("id_mongo")



function crear_botones(fila,i){
    
    //crear un boton de editar para cada registro
    let celda_acciones = fila.insertCell();
    celda_acciones.classList.add('talentico-td')
    //crear un boton
    let boton_editar = document.createElement("button");
    //afectar el contenido del botón
    boton_editar.innerText = "Editar";
    boton_editar.classList.add('talentico-button')
    

    //agregamos un evento al botón
    boton_editar.addEventListener("click", () => {
        //console.log(listado_de_usuarios[i]._id);
        //localStorage.setItem("id_mongo", listado_de_usuarios[i]._id)
        localStorage.setItem("id_mongo", listado_de_candidatos[i]._id);
        window.location.href = "estadoAplicacion.html";

    })
    celda_acciones.appendChild(boton_editar)

}


const mostrar_datos_en_tabla_candidatos = async() => {

    
    listado_de_candidatos = await listar_candidatos_empleo(empleoid);
    console.log(listado_de_candidatos)
    
    
    tbody_candidatos.innerHTML = "";
    
    let head = tbody_candidatos.insertRow()
    candidato = head.insertCell();
    candidato.innerHTML = "Candidato";
    candidato.classList.add("talentico-th");
    puesto = head.insertCell();
    puesto.innerHTML = "Puesto";
    puesto.classList.add("talentico-th");
    estado = head.insertCell();
    estado.innerHTML = "Estado";
    estado.classList.add("talentico-th");
    acciones = head.insertCell();
    acciones.innerHTML = "Acciones";
    acciones.classList.add("talentico-th");

    for (let i = 0; i < listado_de_candidatos.length; i++) {
        let fila = tbody_candidatos.insertRow()
        fila.classList.add("talentico-tr");

        let celda_candidato = fila.insertCell();
        celda_candidato.innerHTML = listado_de_candidatos[i]["candidato"];
        celda_candidato.classList.add("talentico-td");
    
        let celda_puesto = fila.insertCell();
        celda_puesto.innerHTML = listado_de_candidatos[i]["puesto"];
        celda_puesto.classList.add("talentico-td");
        
        let celda_estado = fila.insertCell();
        celda_estado.innerHTML = listado_de_candidatos[i]["estado"];
        celda_estado.classList.add("talentico-td");

        crear_botones(fila, i)
    }
}









const mostrar_datos_en_tabla_invitaciones = async() => {

    listado_de_invitaciones = await listar_invitaciones_empleo(empleoid);
    console.log(listado_de_invitaciones)


    
    tbody.innerHTML = "";
    
    let head = tbody.insertRow()
    correo = head.insertCell();
    correo.innerHTML = "Correo";
    correo.classList.add("talentico-th");
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









mostrar_datos_en_tabla_candidatos()
mostrar_datos_en_tabla_invitaciones()



 

