const express = require('express')
const Notificacion = require('../Models/Notificacion.model')
const router = express.Router();






/*
router.post('/crear-notificacion-usuario',function(req,res){
    let body = req.body;


    let nuevaNotificacion = new Notificacion({
        usuario:body.usuario
       })
    
       //guardar en la BD
       nuevaNotificacion.save()
       .then((notificacionDB)=>{
        //codigo cuando se resuelve la promesa
        res.status(201).json({
            msg:"Notificacion registrada",
            resultado:true,
            notificacionDB
        })
    
       })
       .catch((error)=>{
        res.status(501).json({
            resultado:false,
            msg:"No se registro la notificacion, ocurrio el siguiente error: ",
            error
            
        })
       })
    
        
 });


 router.post('/agregar-notificacion',(req,res)=>{

    if(req.body.usuario){
        Notificacion.updateOne({usuario:req.body.usuario},{
            $push:{
                'notificaciones':{                
                    descripcion:req.body.descripcion,
                    href:req.body.href
                }
            }
        })
        .then(()=>{
            res.json({
                resultado:true,
                msj:'Notificacion agregada'
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
            msj:'No se pudo agregar la notificacion por que no se proporcionó un usuario'
        })
    }
})


*/




router.post('/crear-notificacion-usuario',function(req,res){
    let body = req.body;


    let nuevaNotificacion = new Notificacion({
        usuario:body.usuario,
        descripcion:body.descripcion,
        href:body.href
       })
    
       //guardar en la BD
       nuevaNotificacion.save()
       .then((notificacionDB)=>{
        //codigo cuando se resuelve la promesa
        res.status(201).json({
            msg:"Notificacion registrada",
            resultado:true,
            notificacionDB
        })
    
       })
       .catch((error)=>{
        res.status(501).json({
            resultado:false,
            msg:"No se registro la notificacion, ocurrio el siguiente error: ",
            error
            
        })
       })
    
        
 });


 // Endpoint permite realizar una búsqueda a la base de datos por nombre del usuario
router.get("/listar-notificaciones", (req, res) => {
    let usuario = req.query.usuario;
    
    Notificacion.find({usuario:usuario})
        .then(notificacionDB => {
            if (notificacionDB.length === 0) {
                res.status(200).json({
                    resultado: false,
                    msj: "No hay notificaciones"
                });
            } else {
                res.status(200).json({
                    resultado: true,
                    msj: "Tiene notificaciones",
                    notificacionDB
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