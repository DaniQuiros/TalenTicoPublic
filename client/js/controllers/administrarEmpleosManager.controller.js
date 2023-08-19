const tbody_candidatos = document.querySelector("#table-candidatos tbody")
const tbody_empleos = document.querySelector("#table-empleos tbody")


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

////////////////////////


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
    let boton_eliminar = document.createElement("button");
    //afectar el contenido del botón
    boton_eliminar.innerText = "Eliminar";
    boton_eliminar.classList.add('talentico-button--red')
    boton_eliminar.classList.add('talentico-button')
    

    //agregamos un evento al botón
    boton_candidatos.addEventListener("click", () => {
        //console.log(listado_de_usuarios[i]._id);
        //localStorage.setItem("id_mongo", listado_de_usuarios[i]._id)
        localStorage.setItem("id_mongo", listado_de_empleos[i]._id);
        window.location.href = "listaCandidatosEmpleo.html";

    })

    boton_invitar.addEventListener("click", () => {
        //console.log(listado_de_usuarios[i]._id);
        //localStorage.setItem("id_mongo", listado_de_usuarios[i]._id)
        localStorage.setItem("id_mongo", listado_de_empleos[i]._id);
        window.location.href = "empleosPlantillaReclutador.html";

    })
    


    boton_eliminar.addEventListener("click", () => {
        //console.log(listado_de_usuarios[i]._id);
        //localStorage.setItem("id_mongo", listado_de_usuarios[i]._id)
        localStorage.setItem("id_mongo", listado_de_empleos[i]._id);
        let id = localStorage.getItem('id_mongo');
        console.log(id)
        Swal.fire({
            title: 'Estas seguro de eliminar este empleo?',
            text: "NO podras revertir esta accion!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar'
        }).then((result) => {
            //console.log(id)
            if (result.isConfirmed) {
                eliminar_empleo(id)
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
        }) 
        setTimeout(() => {
            window.location.href = "administrarEmpleosManager.html"; // Redirige a la página después de 3 segundos
        }, 3000); // 3000 milisegundos = 3 segundos

    })


    celda_acciones.appendChild(boton_candidatos)
    celda_acciones.appendChild(boton_invitar)
    celda_acciones.appendChild(boton_eliminar)

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


mostrar_datos_en_tabla_candidatos()

mostrar_datos_en_tabla_empleos()