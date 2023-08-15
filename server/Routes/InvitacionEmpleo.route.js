const express = require('express')
const InvitacionEmpleo = require('../Models/InvitacionesEmpleo.model')//molde para hacer personas
const router = express.Router();
/*
router.post('/crear-InvitacionEmpleo-usuario',function(req,res){
    let body = req.body;


    let nuevaInvitacionEmpleo = new InvitacionEmpleo({
        candidato:body.candidato
       })
    
       //guardar en la BD
       nuevaInvitacionEmpleo.save()
       .then((InvitacionEmpleoDB)=>{
        //codigo cuando se resuelve la promesa
        res.status(201).json({
            msg:"InvitacionEmpleo registrada",
            resultado:true,
            InvitacionEmpleoDB
        })
    
       })
       .catch((error)=>{
        res.status(501).json({
            resultado:false,
            msg:"No se registro la InvitacionEmpleo, ocurrio el siguiente error: ",
            error
            
        })
       })
    
        
 });


 router.post('/agregar-InvitacionEmpleo',(req,res)=>{

    if(req.body.candidato){
        InvitacionEmpleo.updateOne({candidato:req.body.candidato},{
            $push:{
                'detalles':{                
                    puesto:req.body.puesto,
                    remisor:req.body.remisor,
                    href:req.body.href
                }
            }
        })
        .then(()=>{
            res.json({
                resultado:true,
                msj:'InvitacionEmpleo agregada'
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
            msj:'No se pudo agregar la InvitacionEmpleo por que no se proporcionó un candidato'
        })
    }
})

*/


router.post('/crear-InvitacionEmpleo-usuario',function(req,res){
    let body = req.body;


    let nuevaInvitacionEmpleo = new InvitacionEmpleo({
        candidato:body.candidato,
        puesto:body.puesto,    
        remisor:body.remisor,
        href:body.href
       })
    
       //guardar en la BD
       nuevaInvitacionEmpleo.save()
       .then((InvitacionEmpleoDB)=>{
        //codigo cuando se resuelve la promesa
        res.status(201).json({
            msg:"InvitacionEmpleo registrada",
            resultado:true,
            InvitacionEmpleoDB
        })
    
       })
       .catch((error)=>{
        res.status(501).json({
            resultado:false,
            msg:"No se registro la InvitacionEmpleo, ocurrio el siguiente error: ",
            error
            
        })
       })
    
        
 });

 // Endpoint permite realizar una búsqueda a la base de datos por nombre del usuario
router.get("/listar-InvitacionEmpleos", (req, res) => {
    let candidato = req.body.candidato;
    
    InvitacionEmpleo.find({candidato:candidato})
        .then(InvitacionEmpleoDB => {
            if (InvitacionEmpleoDB.length === 0) {
                res.status(200).json({
                    resultado: false,
                    msj: "No hay invitaciones"
                });
            } else {
                res.status(200).json({
                    resultado: true,
                    msj: "Tiene invitaciones",
                    InvitacionEmpleoDB
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