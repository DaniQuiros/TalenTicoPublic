const express = require("express");
const db = require("../models");
const InvitacionEmpleo = db.invitacionEmpleo; //molde para hacer personas
const router = express.Router();

router.post("/crear-InvitacionEmpleo-usuario", function (req, res) {
  let body = req.body;
  let nuevaInvitacionEmpleo = new InvitacionEmpleo({
    candidato: body.candidato,
    puesto: body.puesto,
    remisor: body.remisor,
    href: body.href,
    empleoid: body.empleoid,
  });

  //guardar en la BD
  nuevaInvitacionEmpleo
    .save()
    .then((InvitacionEmpleoDB) => {
      //codigo cuando se resuelve la promesa
      res.status(201).json({
        msg: "InvitacionEmpleo registrada",
        resultado: true,
        InvitacionEmpleoDB,
      });
    })
    .catch((error) => {
      res.status(501).json({
        resultado: false,
        msg: "No se registro la InvitacionEmpleo, ocurrio el siguiente error: ",
        error,
      });
    });
});

// Endpoint permite realizar una búsqueda a la base de datos por nombre del usuario
router.get("/listar-InvitacionEmpleos-candidato", (req, res) => {
  let candidato = req.query.candidato;

  InvitacionEmpleo.find({ candidato: candidato })
    .then((InvitacionEmpleoDB) => {
      if (InvitacionEmpleoDB.length === 0) {
        res.status(200).json({
          resultado: false,
          msj: "No hay invitaciones",
        });
      } else {
        res.status(200).json({
          resultado: true,
          msj: "Tiene invitaciones",
          InvitacionEmpleoDB,
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

router.get("/listar-InvitacionEmpleos-empleo", (req, res) => {
  let empleoid = req.query.empleoid;

  InvitacionEmpleo.find({ empleoid: empleoid })
    .then((InvitacionEmpleoDB) => {
      if (InvitacionEmpleoDB.length === 0) {
        res.status(200).json({
          resultado: false,
          msj: "No hay invitaciones",
        });
      } else {
        res.status(200).json({
          resultado: true,
          msj: "Tiene invitaciones",
          InvitacionEmpleoDB,
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
