// Vinvular los objetos del DOM - Pendiente vincular datos de la tabla estudios y experiencia laboral
const btnGuardar = document.getElementById('btnGuardar');
const txtNombre = document.getElementById("txtNombre");
const txtApellido = document.getElementById("txtApellido");
const txtIdentificacion = document.getElementById("txtIdentificacion");
const slctGenero = document.getElementById("slctGenero");
const txtCorreo = document.getElementById("txtCorreo");
const txtPasswor = document.getElementById("txtPasswor");


function validarCamposVacios(){
    let error = false; // asumimos que no hay errores
    let camposRequeridos = document.querySelectorAll("#datosUsuario [required]")

    for (let i=0; i<camposRequeridos.length; i++){
        if(camposRequeridos[i].value === ""){
            camposRequeridos[i].classList.add("error")
            error = true;
        } else{
            camposRequeridos[i].classList.remove("error")
        }
    }
    return error;
}

function validarNombre(){
    let error = false;
    let texto = txtNombre.value;//en la variable texto se guarda el texto que el usuario escribió dentro del input txtNombre
    //validar usando expresiones regulares
    let regex = /^[a-zA-Z]+$/ ;

    //evaluar el texto dentro del patrón
    if(regex.test(texto)===false){
        txtNombre.classList.add("error");
        error = true;
    }else{
        txtNombre.classList.remove("error");
    }
    return error; //retornar es un true o un false
}

function validarApellido(){
    let error = false;
    let texto = txtApellido.value;//en la variable texto se guarda el texto que el usuario escribió dentro del input txtNombre
    //validar usando expresiones regulares
    let regex = /^[a-zA-Z]+$/ ;

    //evaluar el texto dentro del patrón
    if(regex.test(texto)===false){
        txtApellido.classList.add("error");
        error = true;
    }else{
        txtApellido.classList.remove("error");
    }
    return error; //retornar es un true o un false
}

function validarIdentificacion(){
    let error = false;
    let texto = txtIdentificacion.value;
    let regex = /^[0-9]{1}-[0-9]{4}-[0-9]{4}/; //X-XXXX-XXXX
    if(regex.test(texto)===false){
        txtIdentificacion.classList.add("error");
        error = true;
    }else{
        txtIdentificacion.classList.remove("error");
    }
    return error; 
}

function validarCorreo(){
    let error = false;
    let texto = txtCorreo.value;
    let regex = /^[a-zA-Z0-9\_\-\.]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/;
    if(regex.test(texto)===false){
        txtCorreo.classList.add("error");
        error = true;
    }else{
        txtCorreo.classList.remove("error");
    }
    return error;
}

function validadPassword(){
    let error = false;
    let texto = txtPasswor.value;
    let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if(regex.test(texto)===false){
        txtCorreo.classList.add("error");
        error = true;
    }else{
        txtCorreo.classList.remove("error");
    }
    return error;
}

function enviarDatos(){
    let errorCamposVacios = validarCamposVacios();
    let errorNombre = validarNombre();
    let errorApellido = validarApellido();
    let errorId = validarIdentificacion();
    let errorCorreo = validarCorreo();
    let errorPassword = validadPassword();

    if (errorCamposVacios){
        Swal.fire({
            icon: "warning",
            title: "Se encontraron campos vacios",
            text: "por favor completa los campos señalados"
        })
    }else if(errorNombre){
        Swal.fire({
            icon:"warning",
            title:"Nombre inválido",
            text:"El campo de nombre solo puede contener letras"
        })
    }else if(errorApellido){
        Swal.fire({
            icon:"warning",
            title:"Apellido inválido",
            text:"El campo de apellido solo puede contener letras"
        })
    }else if(errorId){
        Swal.fire({
            icon:"warning",
            title:"Identificación Inválida",
            text:"La identificación debe tener el siguiente formato: 1-0234-5678"
        })
    }else if(errorCorreo){
        Swal.fire({
            icon:"warning",
            title:"Correo inválido",
            text:"Ingrese un correo electrónico válido"
        })
    }else if(errorPassword){
        Swal.fire({
            icon:"warning",
            title:"Contraseña insegura",
            text:"La contraseña debe tener al menos una mayúscula, una minúscula y un numero, con al menos 8 caracteres, no puede tener caracteres especiales"
        })
    }else{
        Swal.fire({
            icon: "success",
            title: "Información validada",
            text: "Registro exitoso"
        })
    }
}

// Asociar evento a boton
btnGuardar.addEventListener('click',enviarDatos);

function procesarRespuesta(response) {
  if (!response.data) {
    return;
  }

  const section = document.createElement("section");

  response.data.forEach((empresa) => {
    const div = document.createElement("div");
    div.classList.add("empresa");
    div.innerHTML = `
      <h2>${empresa.nombre}</h2>
      <span>Cedula Juridica: ${empresa.cedula}</span>
      <span>Correo: ${empresa.correo}</span>
      <span>Descripcion: ${empresa.descripcion}</span>
    `;
    section.appendChild(div);
  });

  document.querySelector("main").appendChild(section);
}

document.addEventListener("DOMContentLoaded", () => {
  axios
    .get("http://localhost:3000/api/empresa")
    .then((res) => {
      procesarRespuesta(res.data);
    })
    .catch((error) => {
      console.log(error.message);
    });
});
