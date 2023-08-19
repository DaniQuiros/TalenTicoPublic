const express = require("express");
const db = require("../models");
const Aplicacion = db.aplicacion; //molde para hacer Aplicacions
const Empleo = db.empleo;
const Usuario = db.usuario;
const router = express.Router();
const { authJwt } = require("../middlewares");
const mailer = require("../templates/cambio-estado-aplicacion");

router.post(
  "/crear-aplicacion-usuario",
  [authJwt.verificarToken],
  async function (req, res) {
    try {
      const usuario = await Usuario.findById(req.userId);
      const empleo = await Empleo.findById(req.body.empleoId).populate(
        "empresa"
      );

      if (!usuario) {
        return res.status(404).send({
          message: "Usuario no encontrado",
        });
      }

      if (!empleo) {
        return res.status(404).send({
          message: "Empleo no encontrado",
        });
      }

      const aplicacion = new Aplicacion({
        candidato: usuario.nombre,
        correo: usuario.correo,
        puesto: empleo.nombrePuesto,
        estado: "Activo",
        empleoid: empleo._id,
        empresaid: empleo.empresa._id,
      });

      await aplicacion.save();

      res.status(201).json({
        resultado: true,
        msg: "Aplicacion registrada",
        AplicacionDB: aplicacion,
      });
    } catch (error) {
      res.status(501).json({
        resultado: false,
        msg: "No se registró la Aplicacion, ocurrio el siguiente error: ",
        error,
      });
    }
  }
);

// Endpoint permite realizar una búsqueda a la base de datos por nombre del usuario
router.get("/listar-aplicaciones", (req, res) => {
  let correo = req.query.correo;

  Aplicacion.find({ correo: correo })
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

router.get("/listar-candidaturas-empresa", (req, res) => {
  let empresaid = req.query.empresaid;

  Aplicacion.find({ empresaid: empresaid })
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

router.put("/editar-aplicacion", function (req, res) {
  let body = req.body;

  let candidato = body.candidato;
  let puesto = body.puesto;
  let correo = body.correo;

  const { _id, estado } = body;

  Aplicacion.updateOne({ _id }, { $set: { _id, estado } })
    .then((AplicacionActualizada) => {
      mailer.mail_aplicacion_estado(candidato, puesto, correo);
      res.status(200).json({
        resultado: true,
        msg: "Información actualizada",
        AplicacionActualizada,
      });
    })
    .catch((error) => {
      res.status(501).json({
        resultado: false,
        msg: "No se pudo actualizar la Aplicacion, ocurrió el siguiente error: ",
        error,
      });
    });
});

router.get("/listar-aplicacion", (req, res) => {
  let _id = req.query._id;

  Aplicacion.find({ _id: _id })
    .then((Aplicacion) => {
      if (Aplicacion.length === 0) {
        res.status(200).json({
          resultado: false,
          msj: "No hay Aplicaciones",
        });
      } else {
        res.status(200).json({
          resultado: true,
          msj: "Tiene Aplicaciones",
          Aplicacion,
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
