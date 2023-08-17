import { validarTodosVacios } from "./validarCamposVacios.controlador.js";
document.addEventListener('DOMContentLoaded', function(){
    const element = document.querySelector('.div-empleos-filter #btn-submit');
    console.log(element);
    if(!element){
        throw new Error('No login button');
    }
    element.addEventListener('click', (event) => {
        console.log('click ');
        if (validarTodosVacios('.div-empleos-filter')){
            event.preventDefault();
            Swal.fire({
                icon: "warning",
                title: "Se encontraron campos vacios",
                text: "por favor complete los campos señalados"
            });
        }
    })
}) 