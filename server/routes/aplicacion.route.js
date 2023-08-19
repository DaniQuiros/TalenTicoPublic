const express = require("express");
const db = require("../models");
const Aplicacion = db.aplicacion; //molde para hacer Aplicacions
const router = express.Router();
const mailer = require("../templates/cambio-estado-aplicacion");

router.post("/crear-aplicacion-usuario", function (req, res) {


  let nuevaAplicacion = new Aplicacion({
    candidato: req.body.candidato,
    correo:req.body.correo,
    puesto: req.body.puesto,
    estado: req.body.estado,
    empleoid: req.body.empleoid,
    empresaid: req.body.empresaid
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


router.put('/editar-aplicacion',function(req,res){

  let body = req.body;
  
  let candidato = body.candidato
  let puesto = body.puesto
  let correo = body.correo  

  const {_id,estado} = body

  Aplicacion.updateOne({_id},{$set:{_id,estado}})
  .then((AplicacionActualizada)=>{
      mailer.mail_aplicacion_estado(candidato, puesto, correo) 
      res.status(200).json({
          resultado:true,
          msg:"Información actualizada",
          AplicacionActualizada
      })
  })
  .catch((error)=>{
      res.status(501).json({
          resultado:false,
          msg:"No se pudo actualizar la Aplicacion, ocurrió el siguiente error: ",
          error
      })
  })

})


router.get("/listar-aplicacion", (req, res) => {
  let _id = req.query._id;

  Aplicacion.find({ _id:_id})
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
