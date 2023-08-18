sessionStorage.setItem("nombreEmpresa","Coca Cola")

const txtNombrePuesto= document.querySelector("#inp-nombrePuesto");
const txtRangoSalarial = document.querySelector("#inp-rango")
const txtRequisitos = document.querySelector("#txtArea-requisitos");
const txtAtributosDeseables = document.querySelector("#txtArea-atributos");
const txtDescripcion = document.querySelector("#txtArea-descripcion");
const txtTipo = document.querySelector("#tipo");
const btn_guardar = document.querySelector("#guardar")

function campos_vacios(){
    let campos_requeridos = document.querySelectorAll("#empleo [required]");
    let error = false;
    for (let i = 0; i < campos_requeridos.length; i++) {
        if (campos_requeridos[i].value == "") {
            campos_requeridos[i].classList.add("error");
            error = true;
        } else {
            campos_requeridos[i].classList.remove("error");
        }
    }
    return error;
};

function limpiar_campos() {
    txtNombrePuesto.value = "";
    txtRangoSalarial.value = "";
    txtRequisitos.value = "";
    txtAtributosDeseables.value=""
    txtDescripcion.value=""
    txtTipo.value=""
}



function obtener_datos(){
    let campos_blancos = campos_vacios();
    if (campos_blancos) {
        Swal.fire({
            icon: "warning",
            title: "Campos en blanco",
            text: "Revise los campos resaltados",
        });
    } else {
        let nombrePuesto = txtNombrePuesto.value;
        let rangoSalarial = txtRangoSalarial.value;
        let requisitos = txtRequisitos.value;
        let atributosDeseables = txtAtributosDeseables.value;
        let descripcion = txtDescripcion.value

        let tipo = txtTipo.value;
        let empresaid = sessionStorage.getItem("empresaid")
        let empresaNombre = sessionStorage.getItem("nombreEmpresa")

        crear_empleo(nombrePuesto, rangoSalarial, requisitos, atributosDeseables, descripcion, tipo, empresaNombre, empresaid );
        
        limpiar_campos();
    }
};

btn_guardar.addEventListener("click", obtener_datos);