const txtCandidato = document.querySelector("#candidato")
const txtPuesto = document.querySelector("#puesto")
const txtEstado = document.querySelector("#estado")
const btn_guardar = document.querySelector("#guardar")

const aplicacion = await obtener_aplicacion(id);

const llenar_campos = async() => {
    let id = localStorage.getItem("id_mongo")
    let aplicacion = await obtener_aplicacion(id);
    console.log(aplicacion);
    

    
    //console.log(persona[0].foto);
    txtCandidato.value = persona[0].candidato;
    txtPuesto.value = persona[0].puesto;
    txtEstado.value = persona[0].estado;

}


function editar_estado_aplicacion(){
    let id = localStorage.getItem("id_mongo")
    let estado = txtEstado.value
    
    modificar_aplicacion(id,estado)
}


llenar_campos()
btn_guardar.addEventListener("click", editar_estado_aplicacion)