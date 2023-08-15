const tbody = document.querySelector("#table-misAplicaciones tbody");
const button_test = document.querySelector("#test-button")


const mostrar_datos_en_tabla = async() => {
    let candidato = "maikol@maikol.com"
    listado_de_aplicaciones = await listar_aplicaciones(candidato);

    //console.log(listado_de_usuarios)

    tbody.innerHTML = "";

    for (let i = 0; i < listado_de_aplicaciones.length; i++) {
        let fila = tbody.insertRow();
        let celda_correo = (fila.insertCell().innerHTML = listado_de_usuarios[i]["puesto"]);
        let celda_nombre = (fila.insertCell().innerHTML = listado_de_usuarios[i]["estado"]);
        //let celda_telefono = (fila.insertCell().innerHTML = listado_de_usuarios[i]["telefonos"][0]["descripcion"]);
        
       // crear_botones(fila,i)//la función crea dos botones uno para eliminar y otro para editar

    }
}

mostrar_datos_en_tabla()

