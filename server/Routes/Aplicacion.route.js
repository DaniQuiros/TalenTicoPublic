const express = require('express')
const Aplicacion = require('../Models/Aplicacion.model')//molde para hacer personas
const router = express.Router();


/*
router.post('/crear-aplicacion-usuario',function(req,res){
    let body = req.body;


    let nuevaAplicacion = new Aplicacion({
        candidato:body.candidato,
       })
    
       //guardar en la BD
       nuevaAplicacion.save()
       .then((AplicacionDB)=>{
        //codigo cuando se resuelve la promesa
        res.status(201).json({
            msg:"Aplicacion registrada",
            resultado:true,
            AplicacionDB
        })
    
       })
       .catch((error)=>{
        res.status(501).json({
            resultado:false,
            msg:"No se registro la Aplicacion, ocurrio el siguiente error: ",
            error
            
        })
       })
    
        
 });


 router.post('/agregar-aplicacion',(req,res)=>{

    if(req.body.candidato){
        Aplicacion.updateOne({candidato:req.body.candidato},{
            $push:{
                'detalles':{                
                    puesto:req.body.puesto,
                    estado:req.body.estado
                }
            }
        })
        .then(()=>{
            res.json({
                resultado:true,
                msj:'Aplicacion agregada'
            })
        })
        .catch((error)=>{
            res.json({
                resultado:false,
                msj:'Ocurrió el siguiente error',
                error
            })
        })

    }else{
        res.json({
            resultado:false,
            msj:'No se pudo agregar la Aplicacion por que no se proporcionó un candidato'
        })
    }
})*/



router.post('/crear-aplicacion-usuario',function(req,res){
    let body = req.body;


    let nuevaAplicacion = new Aplicacion({
        candidato:body.candidato,
        puesto:body.puesto,
        estado:body.estado
       })
    
       //guardar en la BD
       nuevaAplicacion.save()
       .then((AplicacionDB)=>{
        //codigo cuando se resuelve la promesa
        res.status(201).json({
            msg:"Aplicacion registrada",
            resultado:true,
            AplicacionDB
        })
    
       })
       .catch((error)=>{
        res.status(501).json({
            resultado:false,
            msg:"No se registro la Aplicacion, ocurrio el siguiente error: ",
            error
            
        })
       })
    
        
 });


 // Endpoint permite realizar una búsqueda a la base de datos por nombre del usuario
 router.get("/listar-aplicaciones", (req, res) => {
    let candidato = req.query.candidato;
    
    Aplicacion.find({ candidato: candidato })
        .then(AplicacionDB => {
            if (AplicacionDB.length === 0) {
                res.status(200).json({
                    resultado: false,
                    msj: "No hay Aplicaciones",
                });
            } else {
                res.status(200).json({
                    resultado: true,
                    msj: "Tiene Aplicaciones",
                    AplicacionDB
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                resultado: false,
                msj: "Ocurrió el siguiente error",
                error
            });
        });
});


 module.exports = router