const tbody = document.querySelector("#table-misAplicaciones tbody");
const button_test = document.querySelector("#test-button")


const mostrar_datos_en_tabla = async() => {
    let candidato = "jose@maikol.com"
    listado_de_aplicaciones = await listar_aplicaciones(candidato);
    console.log(listado_de_aplicaciones)
    //console.log(listado_de_usuarios)
    
    tbody.innerHTML = "";
    
    let celda_puesto_th =""
    celda_puesto_th.classList.add("talentico-th");

    for (let i = 0; i < listado_de_aplicaciones.length; i++) {
        let fila = tbody.insertRow();
        let celda_puesto = fila.insertCell();
        celda_puesto.innerHTML = listado_de_aplicaciones[i]["puesto"];
        celda_puesto.classList.add("talentico-td");
    
        let celda_estado = fila.insertCell();
        celda_estado.innerHTML = listado_de_aplicaciones[i]["estado"];
        celda_estado.classList.add("talentico-td");
    }

}

mostrar_datos_en_tabla()

