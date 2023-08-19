import { obtenerEmpleo } from "../services/empleos.service.js";
import { aplicarEmpleo } from "../services/aplicaciones.services.js";

const actualizarDatos = (datos) => {
  console.log(datos);
  const nombrePuesto = document.querySelector(".div-empleo-nombre h1");
  const salario = document.querySelector(".empleo-salario");
  const requisitos = document.querySelector(".empleo-requisitos");
  const atributos = document.querySelector(".empleo-atributos");
  const descripcion = document.querySelector(".empleo-descripcion");
  const empresa = document.querySelector(".div-empresa");

  if (!datos) {
    return;
  }

  if (!nombrePuesto || !salario || !requisitos || !atributos) {
    console.log("No se encontraron algunos elementos");
    return;
  }

  nombrePuesto.innerHTML = datos.nombrePuesto;
  salario.innerHTML = `$${datos.rangoSalario}`;
  atributos.innerHTML = datos.atributosCandidato;
  requisitos.innerHTML = datos.requisitos;
  descripcion.innerHTML = datos.descripcionPuesto;

  if (!datos.empresa) {
    console.log("No hay empresa registrada");
    return;
  }

  empresa.innerHTML = `
  <img id="logo-empresa" src="./media/company-logo-example.png" alt="">
  <h2>${datos.empresa.nombre}</h2>
  <p>${datos.empresa.descripcion}</p>
  `;
};

const initAplicarBtn = () => {
  const aplicarBtn = document.querySelector("#btn-Empleo-Aplicar");

  if (!aplicarBtn) {
    console.log("No se encontró el boton de aplicar");
    return;
  }

  aplicarBtn.addEventListener("click", async () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    console.log(id);
    const response = await aplicarEmpleo(id);

    if (response.status === 201) {
      Swal.fire({
        title: "Aplicacion registrada exitosamente",
        icon: "success",
      });
    } else {
      Swal.fire({
        title: "Error al registrar la aplicacion",
        icon: "error",
      });
    }
  });
};

document.addEventListener("DOMContentLoaded", async function () {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) {
    window.location.href = "filtrosEmpleos.html";
    return;
  }

  obtenerEmpleo(id).then((response) => {
    actualizarDatos(response.data);
    initAplicarBtn();
  });
});
