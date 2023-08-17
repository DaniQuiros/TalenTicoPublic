import { validarCamposVacios } from "./validarCamposVacios.controlador.js";
import { signin } from "../services/auth.service.js";

function validarCorreo(element) {
  if (!element) {
    throw new Error("No email input");
  }
  let error = false;
  let texto = element.value;
  let regex = /^[a-zA-Z0-9\_\-\.]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/;
  if (regex.test(texto) === false) {
    element.classList.add("error");
    error = true;
  } else {
    element.classList.remove("error");
  }
  return error;
}

document.addEventListener("DOMContentLoaded", function () {
  const element = document.querySelector(
    '.login-information button[type="submit"]'
  );
  if (!element) {
    throw new Error("No login button");
  }
  element.addEventListener("click", (event) => {
    if (validarCamposVacios(".login-information")) {
      event.preventDefault();
      Swal.fire({
        icon: "warning",
        title: "Se encontraron campos vacios",
        text: "por favor complete los campos señalados",
      });
    } else if (
      validarCorreo(
        document.querySelector(".login-information input[type=email]")
      )
    ) {
      event.preventDefault();
      Swal.fire({
        icon: "warning",
        title: "Correo inválido",
        text: "Ingrese un correo electrónico válido",
      });
    } else {
      event.preventDefault();
      const correo = document.querySelector(
        ".login-information input[type=email]"
      ).value;
      const contrasena = document.querySelector(
        ".login-information input[type=password]"
      ).value;
      signin({ correo, contrasena }).then((response) => {
        if (response.status === 200) {
          if (!response.data || !response.data.roles) {
            Swal.fire({
              icon: "error",
              title: "Error al recibir datos",
              text: "Ocurrió un error. Por favor intente de nuevo",
            });
            return;
          }
          let ruta = "";

          if (response.data.roles.includes("ROL_ADMIN")) {
            ruta = "homePageAdmin.html";
          } else if (response.data.roles.includes("ROL_MANAGER")) {
            ruta = "homePageManager.html";
          } else if (response.data.roles.includes("ROL_RECLUTADOR")) {
            ruta = "homePageReclutador.html";
          } else {
            ruta = "homePageUsuario.html";
          }

          Swal.fire({
            icon: "success",
            title: "Bienvenido",
            text: "Bienvenido al sistema",
          }).then(() => {
            window.location.href = ruta;
          });
        }
      });
    }
  });
}); 


console.log('prueba');