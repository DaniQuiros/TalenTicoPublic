// Necesitamos importar express
const express = require("express");
const db = require("../models");
const Reclutador = db.reclutador;
const router = express.Router();

// POST - http://localhost:3000/api/reclutador
router.post("/reclutador", function (req, res) {
  let peticionBody = req.body;

  // primero debemos crear al usuario y luego enviarlo a BD
  let nuevoReclutador = new Reclutador({
    //cedula:peticionBody.cedula,
    nombre: peticionBody.nombre,
    apellido: peticionBody.apellido,
    genero: peticionBody.genero,
    correo: peticionBody.correo,
    contrasenna: peticionBody.contrasenna,
  });

  // guardar en BD mediante promesa
  nuevoReclutador
    .save()
    // codigo cuando se resulte la promesa
    .then((resultsDB) => {
      res.status(200).json({
        msg: "Usuario registrado de manera exitosa!",
        resultado: true,
        resultsDB,
      });
    })
    .catch((error) => {
      res.status(501).json({
        resultado: false,
        msg: "No se registró al usuario, ocurrio el siguiente error: ",
        error,
      });
    });
});

// Listar - GET - http://localhost:3000/api/reclutador
router.get("/reclutador", function (req, res) {
  // funcion find, trae toda la información en el modelo Persona - Toda persona que haya sido registrada
  Reclutador.find()
    .then((resultadoListaUsuarios) => {
      res.status(200).json({
        msg: "Lista de empleados",
        resultado: true,
        resultadoListaUsuarios,
      });
    })
    .catch((error) => {
      res.status(400).json({
        resultado: false,
        msg: "No se logró recuperar de la BD, ocurrió el siguiente error: ",
        error,
      });
    });
});

// ModificarInformación basica - http://localhost:3000/api/reclutador
router.put("/reclutador", function (req, res) {
  let peticionBody = req.body;

  const {
    _id,
    nombre,
    apellido,
    identificacion,
    genero,
    correo,
    contrasenna,
    foto,
  } = peticionBody;

  Reclutador.updateOne(
    { _id },
    {
      $set: {
        nombre,
        apellido,
        identificacion,
        correo,
        genero,
        contrasenna,
        foto,
      },
    }
  )
    .then((reclutadorActualizado) => {
      res.status(200).json({
        resultado: true,
        msg: "Información actualizada",
        reclutadorActualizado,
      });
    })
    .catch((error) => {
      res.status(501).json({
        resultado: false,
        msg: "No se pudo actualizar los datos, ocurrió el siguiente error: ",
        error,
      });
    });
});

//Eliminar - http://localhost:3000/api/reclutador
router.delete("/reclutador", function (req, res) {
  let peticionBody = req.body;

  Reclutador.deleteOne({ _id: peticionBody._id })
    .then((result) => {
      res.status(200).json({
        resultado: true,
        msg: "Reclutador eliminado",
        result,
      });
    })
    .catch((error) => {
      res.status(501).json({
        resultado: false,
        msg: "No se pudo eliminar al usuario, ocurrió el siguiente error: ",
        error,
      });
    });
});

//Modificar estudios
router.post("/reclutadorAgregarEstudios", (req, res) => {
  if (req.body._id) {
    // PENDIENTE DEFINIR PARAMETRO BUSQUEDA
    Reclutador.updateOne(
      { _id: req.body._id },
      {
        $push: {
          estudios: {
            annoTitulo: req.body.annoTitulo,
            institucion: req.body.institucion,
            carrera: req.body.carrera,
            gradoAcademico: req.body.gradoAcademico,
          },
        },
      }
    )
      .then(() => {
        res.json({
          resultado: true,
          msj: "Estudios agregados",
        });
      })
      .catch((error) => {
        res.json({
          resultado: false,
          msj: "Ocurrió el siguiente error: ",
          error,
        });
      });
  } else {
    res.json({
      resultado: false,
      msj: "No se pudo agregar el estudio porque no se proporcionó un DEFINIR-PARAMETRO-BUSQUEDA",
    });
  }
});

//Modificar experiencia
router.post("/reclutadorAgregarExperiencia", (req, res) => {
  if (req.body._id) {
    // PENDIENTE DEFINIR PARAMETRO BUSQUEDA
    Reclutador.updateOne(
      { _id: req.body._id },
      {
        $push: {
          experiencia: {
            annoIngreso: req.body.annoIngreso,
            annoSalida: req.body.annoSalida,
            empresa: req.body.empresa,
            puesto: req.body.puesto,
          },
        },
      }
    )
      .then(() => {
        res.json({
          resultado: true,
          msj: "Experiencia agregada",
        });
      })
      .catch((error) => {
        res.json({
          resultado: false,
          msj: "Ocurrió el siguiente error: ",
          error,
        });
      });
  } else {
    res.json({
      resultado: false,
      msj: "No se pudo agregar la experiencia porque no se proporcionó un DEFINIR-PARAMETRO-BUSQUEDA",
    });
  }
});

module.exports = router;
