import { listarEmpleos } from "../services/empleos.service.js";
import {
  validarTodosVacios,
  limpiarDatos,
} from "./validarCamposVacios.controlador.js";

const datosPagina = {
  listaEmpleos: [],
  empleosFiltrados: [],
};

const actualizarTabla = () => {
  const tbody = document.querySelector(".talentico-table tbody");
  const thead = document.querySelector("tr");

  tbody.innerHTML = "";
  tbody.appendChild(thead);

  datosPagina.empleosFiltrados.forEach((empleo) => {
    const fila = document.createElement("tr");

    fila.classList.add("talentico-tr");

    fila.innerHTML += `
      <td class="talentico-td"><img src="./media/company-logo-example.png" alt=""></td>
      <td class="talentico-td">
        <a href="./empleosPlantillaReclutador.html?id=${empleo._id}">
          ${empleo.nombrePuesto}
        </a>
      </td>
      <td class="talentico-td">$${empleo.rangoSalario}</td>
      <td class="talentico-td">${empleo.requisitos}</td>
      <td class="talentico-td">
          <a href="./empleosPlantilla.html?id=${empleo._id}">
              <button class="talentico-button" type="button">Ver Detalles</button>
          </a>
      </td>`;

    tbody.appendChild(fila);
  });
};

const filtrarEmpleos = () => {
  datosPagina.empleosFiltrados = datosPagina.listaEmpleos.filter((empleo) => {
    const empresaValida =
      !datosPagina.empresaInput.value ||
      empleo.nombrePuesto
        .toLowerCase()
        .includes(datosPagina.empresaInput.value.toLowerCase());
    const puestoValido =
      !datosPagina.puestoInput.value ||
      empleo.nombrePuesto
        .toLowerCase()
        .includes(datosPagina.puestoInput.value.toLowerCase());
    const salarioValido =
      !datosPagina.salarioInput.value ||
      empleo.rangoSalario >= Number(datosPagina.salarioInput.value);
    const requisitosValido =
      !datosPagina.requisitosInput.value ||
      empleo.requisitos
        .toLowerCase()
        .includes(datosPagina.requisitosInput.value.toLowerCase());

    return empresaValida && puestoValido && salarioValido && requisitosValido;
  });

  actualizarTabla();
};

const obtenerEmpleos = async () => {
  const response = await listarEmpleos();

  if (!response || !response.data) {
    return;
  }

  datosPagina.listaEmpleos = response.data.resultadoListaEmpleos || [];
  datosPagina.empleosFiltrados = datosPagina.listaEmpleos;
};

const initSubmitBtn = () => {
  const $submitBtn = document.querySelector(".div-empleos-filter #btn-submit");

  if (!$submitBtn) {
    throw new Error("No submit button");
  }

  $submitBtn.addEventListener("click", (event) => {
    if (validarTodosVacios(".div-empleos-filter")) {
      event.preventDefault();
      Swal.fire({
        icon: "warning",
        title: "Se encontraron campos vacios",
        text: "por favor complete los campos señalados",
      }).then(() => {
        filtrarEmpleos();
      });
    } else {
      event.preventDefault();
      filtrarEmpleos();
    }
  });
};

const initCancelBtn = () => {
  const $cancelBtn = document.querySelector(
    ".div-empleos-filter #btn-cancelar"
  );

  if (!$cancelBtn) {
    throw new Error("No cancel button");
  }
  $cancelBtn.addEventListener("click", (event) => {
    event.preventDefault();
    limpiarDatos(".div-empleos-filter");
    filtrarEmpleos();
  });
};

const initInputs = () => {
  const empresaInput = document.querySelector(
    ".div-empleos-filter #inp-empresa"
  );
  const puestoInput = document.querySelector(
    ".div-empleos-filter #inp-profesion"
  );
  const salarioInput = document.querySelector(
    ".div-empleos-filter #inp-salario"
  );
  const requisitosInput = document.querySelector(
    ".div-empleos-filter #inp-req"
  );

  if (!empresaInput) {
    throw new Error("No hay input de empresa");
  }

  if (!puestoInput) {
    throw new Error("No hay input de puesto");
  }

  if (!salarioInput) {
    throw new Error("No hay input de salario");
  }

  if (!requisitosInput) {
    throw new Error("No hay input de requisitos");
  }

  datosPagina.empresaInput = empresaInput;
  datosPagina.puestoInput = puestoInput;
  datosPagina.salarioInput = salarioInput;
  datosPagina.requisitosInput = requisitosInput;
};

document.addEventListener("DOMContentLoaded", async function () {
  initInputs();
  initSubmitBtn();
  initCancelBtn();

  obtenerEmpleos().then(() => {
    actualizarTabla();
  });
});
