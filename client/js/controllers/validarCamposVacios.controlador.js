export function validarCamposVacios(parentSelector){
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

export function validarTodosVacios(parentSelector){
    let error = true;
    const inputs = document.querySelectorAll(`${parentSelector} input`);
    inputs.forEach((element) => {
        if (element.value) {
            error = false;
            element.classList.remove('error');
        }
    });
    if(error) {
        inputs.forEach((element) => {
            if (!element.value) {
                element.classList.add('error');
            }
        });
    }
    return error;
}

export function limpiarDatos(parentSelector){
    document.querySelectorAll(`${parentSelector} input`).forEach((element) => {
        element.value = "";
    });
}