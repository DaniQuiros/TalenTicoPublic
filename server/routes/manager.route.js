// Necesitamos importar express
const express = require('express')
const Manager = require('../Models/manager.model')
const router = express.Router();


// POST - http://localhost:3000/api/manager
router.post('/manager',function(req,res){
    let peticionBody = req.body;
    
    let nuevoManager = new Manager({
        nombre:peticionBody.nombre,
        apellido:peticionBody.apellido,
        genero:peticionBody.genero,
        correo:peticionBody.correo,
        contrasenna:peticionBody.contrasenna,
    })

    nuevoManager.save()
    .then((resultsDB)=>{
        res.status(200).json({
            msg: "Manager registrado de manera exitosa!",
            resultado:true,
            resultsDB
        })
    })
    .catch((error)=>{
        res.status(501).json({
            resultado:false,
            msg: "No se registró al manager, ocurrio el siguiente error: ",
            error
        })
    })
});

// Listar - GET - http://localhost:3000/api/manager
router.get('/manager',function(req,res){
    Manager.find()
    .then((resultadoListaManager)=>{
        res.status(200).json({
            msg: "Lista de manger",
            resultado:true,
            resultadoListaManager
        })
    })
    .catch((error)=>{
        res.status(400).json({
            resultado:false,
            msg:"No se logró recuperar de la BD, ocurrió el siguiente error: ",
            error
        })
    })
})

// ModificarInformación basica - http://localhost:3000/api/manager
router.put('/manager',function(req,res){
    
    let peticionBody = req.body;

    const {_id, nombre, apellido, identificacion, genero, correo, contrasenna, foto} = peticionBody

    Manager.updateOne({_id},{$set:{nombre, apellido, identificacion, correo, genero, contrasenna, foto}})
    .then((managerActualizado)=>{
        res.status(200).json({
            resultado:true,
            msg:"Información actualizada",
            managerActualizado
        })
    })
    .catch((error)=>{
        res.status(501).json({
            resultado:false,
            msg:"No se pudo actualizar los datos, ocurrió el siguiente error: ",
            error
        })
    })
})

//Eliminar - http://localhost:3000/api/manager
router.delete('/manager',function(req,res){

    let peticionBody = req.body;

    Manager.deleteOne({_id:peticionBody._id})
    .then((result)=>{
        res.status(200).json({
            resultado:true,
            msg:"Manager eliminado",
            result
        })
    })
    .catch((error)=>{
        res.status(501).json({
            resultado:false,
            msg:"No se pudo eliminar al usuario, ocurrió el siguiente error: ",
            error
        })
    })
})

//Modificar estudios
router.post('/mangerAgregarEstudios',(req,res)=>{
    if(req.body._id){
        Manager.updateOne({_id:req.body._id}, {
            $push:{
                "estudios":{
                    annoTitulo:req.body.annoTitulo,
                    institucion:req.body.institucion,
                    carrera:req.body.carrera,
                    gradoAcademico:req.body.gradoAcademico
                }
            }
        })
        .then(()=>{
            res.json({
                resultado:true,
                msj:"Estudios agregados"
            })
        })
        .catch((error)=>{
            res.json({
                resultado:false,
                msj:"Ocurrió el siguiente error: ",
                error
            })
        })
    }else{
        res.json({
            resultado:false,
            msj:"No se pudo agregar el estudio porque no se proporcionó un DEFINIR-PARAMETRO-BUSQUEDA"
        })
    }

})

//Modificar experiencia
router.post('/managerAgregarExperiencia',(req,res)=>{
    if(req.body._id){
        Manager.updateOne({_id:req.body._id}, {
            $push:{
                "experiencia":{
                    annoIngreso:req.body.annoIngreso,
                    annoSalida:req.body.annoSalida,
                    empresa:req.body.empresa,
                    puesto:req.body.puesto
                }
            }
        })
        .then(()=>{
            res.json({
                resultado:true,
                msj:"Experiencia agregada"
            })
        })
        .catch((error)=>{
            res.json({
                resultado:false,
                msj:"Ocurrió el siguiente error: ",
                error
            })
        })
    }else{
        res.json({
            resultado:false,
            msj:"No se pudo agregar la experiencia porque no se proporcionó un DEFINIR-PARAMETRO-BUSQUEDA"
        })
    }

})

module.exports = router