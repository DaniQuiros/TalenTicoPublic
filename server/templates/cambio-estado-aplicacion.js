const nodemailer = require("nodemailer");
require("dotenv").config();

const mail_aplicacion_estado = (pusuario, ppuesto, pestado, pcorreo) =>{
    let transporter = nodemailer.createTransport({
        service: "Gmail",
        auth:{
            user: process.env.byte0psdevs,
            pass: process.env.MAILPSSWD,
        },
        connectionTimeout: 5*60*1000, // 5min
        tls:{
            ciphers:"SSLv3",
        },
        logger:true,
        debug:true,
    });

    let mail_options ={
        from: "TalenTico",
        to: pcorreo,
        subject:"Su aplicacion ha sido actualizada",
        html:`<h1>Estimado ${pusuario}</h1>
        <p>La aplicacion de ${pcandidato} al puesto ${ppuesto} ha sido cambiada a: ${pestado}</p>
    `
    };

    transporter.sendMail(mail_options, (error, info)=>{
        if (error){
            console.log(error);
        }else{
            console.log("El correo se envió correctamente: " + info.response);
        }
    });
};

module.exports = {mail_aplicacion_estado}