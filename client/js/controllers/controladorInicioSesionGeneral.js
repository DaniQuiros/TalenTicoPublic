import { validarCamposVacios } from "./validarCamposVacios.controlador.js";

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



document.addEventListener('DOMContentLoaded', function(){
    const element = document.querySelector('.login-information button[type="submit"]');
    if(!element){
        throw new Error('No login button');
    }
    element.addEventListener('click', (event) => {
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
    })
}) 


console.log('prueba');