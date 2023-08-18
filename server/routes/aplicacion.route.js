const express = require("express");
const db = require("../models");
const Aplicacion = db.aplicacion; //molde para hacer personas
const router = express.Router();
const mailer = require("../templates/cambio-estado-aplicacion");

router.post("/crear-aplicacion-usuario", function (req, res) {


  let nuevaAplicacion = new Aplicacion({
    candidato: req.body.candidato,
    puesto: req.body.puesto,
    estado: req.body.estado,
    empleoid: req.body.empleoid
  });

  //guardar en la BD
  nuevaAplicacion
    .save()
    .then((AplicacionDB) => {
      //codigo cuando se resuelve la promesa}

      res.status(201).json({
        msg: "Aplicacion registrada",
        resultado: true,
        AplicacionDB,
      });
    })
    .catch((error) => {
      res.status(501).json({
        resultado: false,
        msg: "No se registro la Aplicacion, ocurrio el siguiente error: ",
        error,
      });
    });
});


// Endpoint permite realizar una búsqueda a la base de datos por nombre del usuario
router.get("/listar-aplicaciones", (req, res) => {
  let candidato = req.query.candidato;

  Aplicacion.find({ candidato: candidato })
    .then((AplicacionDB) => {
      if (AplicacionDB.length === 0) {
        res.status(200).json({
          resultado: false,
          msj: "No hay Aplicaciones",
        });
      } else {
        res.status(200).json({
          resultado: true,
          msj: "Tiene Aplicaciones",
          AplicacionDB,
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        resultado: false,
        msj: "Ocurrió el siguiente error",
        error,
      });
    });
});

// Endpoint permite realizar una búsqueda a la base de datos por nombre del usuario
router.get("/listar-candidatos-tabla", (req, res) => {
  let empleoid = req.query.empleoid;

  Aplicacion.find({ empleoid: empleoid })
    .then((AplicacionDB) => {
      if (AplicacionDB.length === 0) {
        res.status(200).json({
          resultado: false,
          msj: "No hay Aplicaciones",
        });
      } else {
        res.status(200).json({
          resultado: true,
          msj: "Tiene Aplicaciones",
          AplicacionDB,
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        resultado: false,
        msj: "Ocurrió el siguiente error",
        error,
      });
    });
});


module.exports = router;
