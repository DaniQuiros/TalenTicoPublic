// Necesitamos importar express
const express = require('express')
const Usuario = require('../models/usuario.model')
const Reclutador = require('../models/reclutador.model')
const Manager = require("../models/manager.model")
const mailer = require("../templates/recuperacionContrasenna")
const router = express.Router();

// Función para generar una contraseña aleatoria
function generateRandomPassword(length) {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset.charAt(randomIndex);
    }
    return password;
}

router.get("/buscarCorreo", (req, res) => {
    
    let correo = req.query.correo;
    let  temporaryPassword = generateRandomPassword(8)
    
    Reclutador.find({correo: correo})
        .then(ReclutadorDB => {
            if (ReclutadorDB.length === 0) {
                Usuario.find({correo:correo})
                .then (usuarioDB=>{
                    if(usuarioDB.length===0){
                        Manager.find({correo: correo})
                        .then(ManagerDB=>{
                            if(ManagerDB.length===0){
                                res.status(500).json({
                                    resultado: true,
                                    msj: "Persona no registrada"
                                })    
                            }
                            else{
                                   res.status(200).json({
                                   resultado:true,
                                   msj:"Persona encontrada",
                                   Manager:ManagerDB
                                })
                                mailer.enviar_mail(temporaryPassword,correo)    
                            }
                        })
                    } else{ 
                            res.status(200).json({
                            resultado:true,
                            msj:"Persona encontrada",
                            usuario:usuarioDB
                        })
                        mailer.enviar_mail(temporaryPassword,correo)
                    }
                })   
            } else {
                res.status(200).json({
                    resultado: true,
                    msj: "Persona encontrada",
                    reclutador: ReclutadorDB
                });
                mailer.enviar_mail(temporaryPassword,correo)
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