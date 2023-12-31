// Necesitamos importar express
const express = require("express");
const db = require("../models");
const Empleo = db.empleo;
const router = express.Router();

// POST - http://localhost:3000/api/empleo
router.post("/empleo", function (req, res) {
  let peticionBody = req.body;

  // primero debemos crear al usuario y luego enviarlo a BD
  let nuevoEmpleo = new Empleo({
    nombrePuesto: peticionBody.nombrePuesto,
    rangoSalario: peticionBody.rangoSalario,
    requisitos: peticionBody.requisitos,
    atributosCandidato: peticionBody.atributosCandidato,
    descripcionPuesto: peticionBody.descripcionPuesto,
    tipo: peticionBody.tipo,
    empresaNombre: peticionBody.empresaNombre,
    empresaid: peticionBody.empresaid,
    empresa: peticionBody.empresa
  });

  // guardar en BD mediante promesa
  nuevoEmpleo
    .save()
    // codigo cuando se resulte la promesa
    .then((resultsDB) => {
      res.status(200).json({
        msg: "Empleo registrado de manera exitosa!",
        resultado: true,
        resultsDB,
      });
    })
    .catch((error) => {
      res.status(501).json({
        resultado: false,
        msg: "No se registró al empleo, ocurrio el siguiente error: ",
        error,
      });
    });
});

// Listar - GET - http://localhost:3000/api/empleo
router.get("/empleo", function (req, res) {
  // funcion find, trae toda la información en el modelo Persona - Toda persona que haya sido registrada
  Empleo.find()
    .then((resultadoListaEmpleos) => {
      res.status(200).json({
        msg: "Lista de empleos",
        resultado: true,
        resultadoListaEmpleos,
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

router.get("/empleo/:id", function (req, res) {
  const { id } = req.params;

  Empleo.findById(id)
    .populate("empresa", { __v: 0 })
    .then((empleo) => {
      res.status(200).json(empleo);
    })
    .catch((error) => {
      res.status(500).json({
        resultado: false,
        msg: "No se logró recuperar de la BD, ocurrió el siguiente error: ",
        error,
      });
    });
});

// ModificarInformación basica - http://localhost:3000/api/empleo
router.put("/empleo", function (req, res) {
  let peticionBody = req.body;

  const {
    _id,
    nombrePuesto,
    rangoSalario,
    requisitos,
    atributosCandidato,
    descripcionPuesto,
    tipo,
    empresaNombre,
  } = peticionBody;

  Empleo.updateOne(
    { _id },
    {
      $set: {
        nombrePuesto,
        rangoSalario,
        requisitos,
        atributosCandidato,
        descripcionPuesto,
        tipo,
        empresaNombre,
      },
    }
  )
    .then((empleoActualizado) => {
      res.status(200).json({
        resultado: true,
        msg: "Información actualizada",
        empleoActualizado,
      });
    })
    .catch((error) => {
      res.status(501).json({
        resultado: false,
        msg: "No se pudo actualizar el empleo, ocurrió el siguiente error: ",
        error,
      });
    });
});

//Eliminar - http://localhost:3000/api/empleo
router.delete("/empleo", function (req, res) {
  let cuerpoPeticion = req.body;

  Empleo.deleteOne({ _id: cuerpoPeticion._id })
    .then((result) => {
      res.status(200).json({
        resultado: true,
        msg: "Empleo eliminado",
        result,
      });
    })
    .catch((error) => {
      res.status(501).json({
        resultado: false,
        msg: "No se pudo eliminar al empleo, ocurrió el siguiente error: ",
        error,
      });
    });
});

/*
router.get("/listar-empleos-empresa", (req, res) => {
  let empresaid = req.query.empresaid;

  Empleo.find({ empresaid: empresaid })
    .then((EmpleoDB) => {
      if (EmpleoDB.length === 0) {
        res.status(200).json({
          resultado: false,
          msj: "No hay Empleos",
        });
      } else {
        res.status(200).json({
          resultado: true,
          msj: "Tiene Empleos",
          EmpleoDB,
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
*/
router.get("/listar-empleos-empresa", (req, res) => {
  let empresa = req.query.empresa;

  Empleo.find({ empresa: empresa})
    .then((EmpleoDB) => {
      if (EmpleoDB.length === 0) {
        res.status(200).json({
          resultado: false,
          msj: "No hay Empleos",
        });
      } else {
        res.status(200).json({
          resultado: true,
          msj: "Tiene Empleos",
          EmpleoDB,
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

// Endpoint permite realizar una búsqueda a la base de datos por nombre del empleo
router.get("/buscarEmpleo", (req, res) => {
  let nombrePuesto = req.query.nombrePuesto;

  Empleo.find({ nombrePuesto: nombrePuesto })
    .then((empleoDB) => {
      if (empleoDB.length === 0) {
        res.status(200).json({
          resultado: true,
          msj: "Empleo no encontrado",
        });
      } else {
        res.status(200).json({
          resultado: true,
          msj: "Empleo encontrado",
          empleo: empleoDB,
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

router.get("/buscarEmpleo", (req, res) => {
  let nombrePuesto = req.query.nombrePuesto;

  Empleo.findOne({ nombrePuesto: nombrePuesto })
    .then((empleoDB) => {
      if (empleoDB.length === 0) {
        res.status(200).json({
          resultado: true,
          msj: "Empleo no encontrado",
        });
      } else {
        res.status(200).json({
          resultado: true,
          msj: "Empleo encontrado",
          empleo: empleoDB,
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
