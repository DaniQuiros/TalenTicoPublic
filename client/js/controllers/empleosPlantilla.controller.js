import { obtenerEmpleo } from "../services/empleos.service.js";

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

document.addEventListener("DOMContentLoaded", async function () {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) {
    window.location.href = "filtrosEmpleos.html";
    return;
  }

  obtenerEmpleo(id).then((response) => {
    actualizarDatos(response.data);
  });
});
