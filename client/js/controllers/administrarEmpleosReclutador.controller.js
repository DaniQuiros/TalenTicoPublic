const tbody_candidatos = document.querySelector("#table-candidatos tbody")

let empleoid= "1234578"







const mostrar_datos_en_tabla_candidatos = async() => {

    
    let Daniela = "123456789"
    listado_de_candidatos = await listar_candidatos_empleo_empresa(Daniela);
    console.log(listado_de_candidatos)
    
    
    tbody_candidatos.innerHTML = "";
    
    let head = tbody_candidatos.insertRow()
    candidato = head.insertCell();
    candidato.innerHTML = "candidato";
    candidato.classList.add("talentico-th");
    puesto = head.insertCell();
    puesto.innerHTML = "Puesto";
    puesto.classList.add("talentico-th");
    estado = head.insertCell();
    estado.innerHTML = "Puesto";
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







mostrar_datos_en_tabla_candidatos()