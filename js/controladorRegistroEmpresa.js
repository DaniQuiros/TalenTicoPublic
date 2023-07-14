function validarCamposVacios(parentSelector){
    let error = false; // asumimos que no hay errores
    document.querySelectorAll(`${parentSelector} [required]`).forEach((element) => {
        if(!element.value) {
            element.classList.add('error');
            error = true;
        } else {
            element.classList.remove('error');
        }
    });
    return error;
}

function validarCorreo(element){
    if(!element){
        throw new Error('No email input');
    }
    let error = false;
    let texto = element.value;
    let regex = /^[a-zA-Z0-9\_\-\.]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/;
    if(regex.test(texto)===false){
        element.classList.add("error");
        error = true;
    }else{
        element.classList.remove("error");
    }
    return error;
}


function validarNombre(element){
    if(!element){
        throw new Error('No name input');
    }
    let error = false;
    let texto = element.value;
    let regex = /^[a-zA-Z]+$/;
    if(regex.test(texto)===false){
        element.classList.add("error");
        error = true;
    }else{
        element.classList.remove("error");
    }
    return error;
}

function validarCedula(element){
    if(!element){
        throw new Error('No email input');
    }
    let error = false;
    let texto = element.value;
    let regex = /^[0-9]{1}-[0-9]{3}-[0-9]{4}/;
    if(regex.test(texto)===false){
        element.classList.add("error");
        error = true;
    }else{
        element.classList.remove("error");
    }
    return error;
}

function validarContrasena(element){
    let error = false;
    let texto = element.value;
    let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if(regex.test(texto)===false){
        element.classList.add("error");
        error = true;
    }else{
        element.classList.remove("error");
    }
    return error;
}

function validarConfirmacionContrasena(passwordElement, confirmationElement){
    if(!passwordElement || !confirmationElement){
        throw new Error("missing password or confirmation element");
    }
    let error = false;
    if(passwordElement.value !== confirmationElement.value){
        passwordElement.classList.add("error");
        confirmationElement.classList.add("error");
        error = true;
    }else{
        passwordElement.classList.remove("error");
        confirmationElement.classList.remove("error");
    }
    return error;
}


document.addEventListener('DOMContentLoaded', function(){
    const element = document.querySelector('.login-information form');
    if(!element){
        throw new Error('No login button');
    }
    element.addEventListener('submit', (event) => {
        if (validarCamposVacios('.login-information')){
            event.preventDefault();
            Swal.fire({
                icon: "warning",
                title: "Se encontraron campos vacios",
                text: "por favor complete los campos señalados"
            });
        }
        else if(validarCorreo(document.querySelector('.login-information input[type=email]'))){
            event.preventDefault();
            Swal.fire({
                icon:"warning",
                title:"Correo inválido",
                text:"Ingrese un correo electrónico válido"
            })
        }
        else if(validarNombre(document.querySelector('.login-information #nombreUsuario'))){
            event.preventDefault();
            Swal.fire({
                icon:"warning",
                title:"Nombre inválido",
                text:"El campo de nombre solo puede contener letras"
            })
        }
        else if(validarCedula(document.querySelector('.login-information #cedulaUsuario'))){
            event.preventDefault();
            Swal.fire({
                icon:"warning",
                title:"Cédula Juridica Inválida",
                text:"El campo de cédula solo puede contener números"
            })
        }
        else if(validarContrasena(document.querySelector('.login-information #password'))){
            event.preventDefault();
            Swal.fire({
                icon:"warning",
                title:"Contraseña insegura",
                text:"La contraseña debe tener al menos una mayúscula, una minúscula y un numero, con al menos 8 caracteres, no puede tener caracteres especiales"
            })
        }
        else if(validarConfirmacionContrasena(document.querySelector('.login-information #password'), document.querySelector('.login-information #confirmPassword'))){
            event.preventDefault();
            Swal.fire({
                icon:"warning",
                title:"La confirmacion de contraseña no  coincide",
                text:"Por favor verifique que la confirmacion de contraseña coincida con la contraseña"
            })
        }
    })
}) 


console.log('prueba');