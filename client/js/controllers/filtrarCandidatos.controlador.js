import { validarTodosVacios, limpiarDatos } from "./validarCamposVacios.controlador.js";
document.addEventListener('DOMContentLoaded', function(){
    const $submitBtn = document.querySelector('.div-candidatos-filter #btn-submit');
    const $cancelBtn = document.querySelector('.div-candidatos-filter #btn-cancelar');
    console.log($submitBtn);
    if(!$submitBtn){
        throw new Error('No login button');
    }
    $submitBtn.addEventListener('click', (event) => {
        console.log('click ');
        if (validarTodosVacios('.div-candidatos-filter')){
            event.preventDefault();
            Swal.fire({
                icon: "warning",
                title: "Se encontraron campos vacios",
                text: "por favor complete los campos señalados"
            });
        }
    })
    if(!$cancelBtn){
        throw new Error('No cancel button');
    }
    $cancelBtn.addEventListener('click', (event) => {
        event.preventDefault();
        console.log('click ');
        limpiarDatos('.div-candidatos-filter');
    });
}) 