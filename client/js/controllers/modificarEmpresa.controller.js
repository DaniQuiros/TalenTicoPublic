const txtNombre = document.querySelector("#txtNombre")
const txtCedula = document.querySelector("#txtIdentificacion")
const txtAreaDescripcion = document.querySelector("#txtAreaDescripcion")
const txtCorreo = document.querySelector("#txtCorreo")
const txtPasswor = document.querySelector("#txtPasswor")
const btnGuardar = document.querySelector("#btnGuardar")
const btnCancelar = document.querySelector("#btnCancelar")

const txtAreaMision = document.querySelector("#txtAreaMision")
const txtAreaVision = document.querySelector("#txtAreaVision")
const txtAreaBeneficios = document.querySelector("a")



//crear una funcion para llenar los campos del formulario de editar
const llenar_campos = async() => {
    let empresa = await obtener_empresa_cedula(identificacion);
    //console.log(persona);
    _id = persona[0]._id;

    
    //console.log(persona[0].foto);
    txtCedula.value = persona[0].cedula;
    txtCorreo.value = persona[0].correo;
    txtNombre.value = persona[0].nombre;
    input_foto.src = persona[0].foto;

}


function campos_vacios(){
    let campos_requeridos = document.querySelectorAll("#frm-registro [required]");
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

function validar_cedula(){
    let cedula = txtCedula.value;
    let error = false;
    let expresion = /^[1-9]{1}-[0-9]{4}-[0-9]{4}$/;
    if (expresion.test(cedula) == false) {
        txtCedula.classList.add("error");
        error = true;
    } else {
        txtCedula.classList.remove("error");
    }
    return error;
};

function validar_correo() {
    let correo = txtCorreo.value;
    let error = false;
    let expresion = /^[a-zA-Z0-9.]+\@*[a-zA-Z0-9]*\@{1}[a-zA-Z]+.com$/;
    if (expresion.test(correo) == false) {
        txtCorreo.classList.add("error");
        error = true;
    } else {
        txtCorreo.classList.remove("error");
    }
    return error;
};

function validar_nombre(){
    let nombre = txtNombre.value;
    let error = false;
    let expresion = /^[a-zA-Z\s]+$/;
    if (expresion.test(nombre) == false) {
        txtNombre.classList.add("error");
        error = true;
    } else {
        txtNombre.classList.remove("error");
    }
    return error;
};

function limpiar_campos(){
    txtCedula.value = "";
    txtCorreo.value = "";
    txtNombre.value = "";
}

function obtener_datos(){
    let campos_blancos = campos_vacios();
    let error_cedula = validar_cedula();
    let error_correo = validar_correo();
    let error_nombre = validar_nombre();
    if (campos_blancos) {
        Swal.fire({
            icon: "warning",
            title: "Campos en blanco",
            text: "Revise los campos resaltados",
        });
    } else if (error_cedula) {
        Swal.fire({
            icon: "warning",
            title: "Error en la cédula",
            text: "Revise que la cédula cumple con el siguiente formato: x-xxxx-xxxx",
        });
    } else if (error_correo) {
        Swal.fire({
            icon: "warning",
            title: "Correo incorrecto",
            text: "Por favor revise el correo que ingresó",
        });
    } else if (error_nombre) {
        Swal.fire({
            icon: "warning",
            title: "Nombre no es válido",
            text: "El nombre solo debe de contener letras ",
        });
    } else {
        let cedula = txtCedula.value;
        let correo = txtCorreo.value;
        let nombre = txtNombre.value;
        let foto = input_foto.src;
        modificar_persona(_id, cedula, correo, nombre, foto);
        
        limpiar_campos();
    }
};

function eliminar(){
    eliminar_persona(_id);
}

btn_actualizar.addEventListener("click", obtener_datos);

btn_eliminar.addEventListener("click", eliminar);

llenar_campos();