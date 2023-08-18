import { listarCandidatos } from "../services/candidatos.service.js";
import {
  validarTodosVacios,
  limpiarDatos,
} from "./validarCamposVacios.controlador.js";

const datosPagina = {
  listaCandidatos: [],
  candidatosFiltrados: [],
};

const actualizarTabla = () => {
  const tbody = document.querySelector(".talentico-table tbody");
  const thead = document.querySelector("tr");

  tbody.innerHTML = "";
  tbody.appendChild(thead);

  datosPagina.candidatosFiltrados.forEach((candidato) => {
    const fila = document.createElement("tr");

    fila.classList.add("talentico-tr");

    fila.innerHTML = `
      <td class="talentico-td">${candidato.nombre} ${candidato.apellido}</td>
      <td class="talentico-td">${candidato.correo}</td>
      <td class="talentico-td">
        <ul>
          ${candidato.experiencia.reduce(
            (a, e) => a + "<li>" + e.puesto + ", " + e.empresa + "</li>",
            ""
          )}</td>
        </ul>
      <td class="talentico-td">${candidato.estudios.reduce(
        (a, e) =>
          a +
          "<li>" +
          e.gradoAcademico +
          " " +
          e.carrera +
          ", " +
          e.institucion +
          "</li>",
        ""
      )}</td>
      <td class="talentico-td">
        <a href="./administrarEmpleosReclutador.html?candidato=${
          candidato._id
        }">
          <button class="talentico-button" type="button">Enviar Invitacion</button>
        </a>
      </td>`;

    tbody.appendChild(fila);
  });
};

const filtrarCandiatos = () => {
  datosPagina.candidatosFiltrados = datosPagina.listaCandidatos.filter(
    (candidato) => {
      const experienciaValida =
        !datosPagina.experienciaInput.value ||
        candidato.experiencia.some(
          (e) =>
            e.institucion.toLowerCase.includes(
              datosPagina.empresaInput.value.toLowerCase()
            ) ||
            e.carrera.toLowerCase.includes(
              datosPagina.empresaInput.value.toLowerCase()
            ) ||
            e.gradoAcademico.toLowerCase.includes(
              datosPagina.empresaInput.value.toLowerCase()
            )
        );
      const estudioValido =
        !datosPagina.estudiosInput.value ||
        candidato.estudios.some(
          (e) =>
            e.empresa.toLowerCase.includes(
              datosPagina.estudiosInput.value.toLowerCase()
            ) ||
            e.puesto.toLowerCase.includes(
              datosPagina.estudiosInput.value.toLowerCase()
            )
        );

      return experienciaValida && estudioValido;
    }
  );

  actualizarTabla();
};

const obtenerCandidatos = async () => {
  const response = await listarCandidatos();

  if (!response || !response.data) {
    return;
  }

  datosPagina.listaCandidatos = response.data || [];
  datosPagina.candidatosFiltrados = datosPagina.listaCandidatos;
};

const initInputs = () => {
  const experienciaInput = document.querySelector(
    ".div-candidatos-filter #inp-experiencia"
  );
  const estudiosInput = document.querySelector(
    ".div-candidatos-filter #inp-estudios"
  );

  if (!experienciaInput) {
    throw new Error("No hay input de experiencia");
  }

  if (!estudiosInput) {
    throw new Error("No hay input de estudios");
  }

  datosPagina.experienciaInput = experienciaInput;
  datosPagina.estudiosInput = estudiosInput;
};

const initSubmitBtn = () => {
  const $submitBtn = document.querySelector(
    ".div-candidatos-filter #btn-submit"
  );

  if (!$submitBtn) {
    throw new Error("No submit button");
  }

  $submitBtn.addEventListener("click", (event) => {
    if (validarTodosVacios(".div-candidatos-filter")) {
      event.preventDefault();
      Swal.fire({
        icon: "warning",
        title: "Se encontraron campos vacios",
        text: "por favor complete los campos señalados",
      }).then(() => {
        filtrarCandiatos();
      });
    } else {
      event.preventDefault();
      filtrarCandiatos();
    }
  });
};

const initCancelBtn = () => {
  const $cancelBtn = document.querySelector(
    ".div-candidatos-filter #btn-cancelar"
  );

  if (!$cancelBtn) {
    throw new Error("No cancel button");
  }
  $cancelBtn.addEventListener("click", (event) => {
    event.preventDefault();
    limpiarDatos(".div-candidatos-filter");
    filtrarCandiatos();
  });
};

document.addEventListener("DOMContentLoaded", function () {
  initInputs();
  initSubmitBtn();
  initCancelBtn();

  obtenerCandidatos().then(() => {
    actualizarTabla();
  });
});
