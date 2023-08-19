const tbody_candidatos = document.querySelector("#table-candidatos tbody")
const tbody_empleos = document.querySelector("#table-empleos tbody")
sessionStorage.setItem("empresaid","123456789")








const mostrar_datos_en_tabla_candidatos = async() => {

    let empresaid = sessionStorage.getItem("empresaid")
    listado_de_candidatos = await listar_candidatos_empleo_empresa(empresaid);
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

    
    }
}



function crear_botones_empleos(fila,i){
    
    //crear un boton de editar para cada registro
    let celda_acciones = fila.insertCell();
    celda_acciones.classList.add('talentico-td')
    let boton_candidatos = document.createElement("button");
    //afectar el contenido del botón
    boton_candidatos.innerText = "Candidatos";
    boton_candidatos.classList.add('talentico-button')
    
    let boton_invitar = document.createElement("button");
    //afectar el contenido del botón
    boton_invitar.innerText = "Invitar";
    boton_invitar.classList.add('talentico-button')
    //crear un boton
    
    

    //agregamos un evento al botón
    boton_candidatos.addEventListener("click", () => {
        //console.log(listado_de_usuarios[i]._id);
        //localStorage.setItem("id_mongo", listado_de_usuarios[i]._id)
        localStorage.setItem("id_mongo", listado_de_empleos[i]._id);
        window.location.href = "listaCandidatosEmpleoReclutador.html";

    })

    boton_invitar.addEventListener("click", () => {
        //console.log(listado_de_usuarios[i]._id);
        //localStorage.setItem("id_mongo", listado_de_usuarios[i]._id)
        localStorage.setItem("id_mongo", listado_de_empleos[i]._id);
        window.location.href = "empleosPlantillaReclutador.html";

    })

    celda_acciones.appendChild(boton_candidatos)
    celda_acciones.appendChild(boton_invitar)

}




const mostrar_datos_en_tabla_empleos = async() => {

    let empresaid = sessionStorage.getItem("empresaid")
    
    listado_de_empleos = await listar_empleo_empresa(empresaid);
    
    console.log(listado_de_empleos)
    
    
    tbody_empleos.innerHTML = "";
    
    let head = tbody_empleos.insertRow()
    puesto = head.insertCell();
    puesto.innerHTML = "Puesto";
    puesto.classList.add("talentico-th");
    Tipo = head.insertCell();
    Tipo.innerHTML = "Tipo";
    Tipo.classList.add("talentico-th");
    
    acciones = head.insertCell();
    acciones.innerHTML = "Acciones";
    acciones.classList.add("talentico-th");

    for (let i = 0; i < listado_de_empleos.length; i++) {
        let fila = tbody_empleos.insertRow()
        fila.classList.add("talentico-tr");
        
        let celda_puesto = fila.insertCell();
        celda_puesto.innerHTML = listado_de_empleos[i]["nombrePuesto"];
        celda_puesto.classList.add("talentico-td");
        
        let celda_tipo = fila.insertCell();
        celda_tipo.innerHTML = listado_de_empleos[i]["tipo"];
        celda_tipo.classList.add("talentico-td");


        crear_botones_empleos(fila, i)
    }
}





















mostrar_datos_en_tabla_empleos()
mostrar_datos_en_tabla_candidatos()
