const nodemailer = require("nodemailer");
require("dotenv").config();

const enviar_mail = (pnombre, pcontrasenna, pcorreo) =>{
    let transporter = nodemailer.createTransport({
        service: "Gmail",
        auth:{
            user: process.env.MAILUSER,
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
        subject:"Contraseña temporal",
        html:"Nombre usuario: "+pnombre+", contraseña temporal: "+pcontrasenna,
    };

    transporter.sendMail(mail_options, (error, info)=>{
        if (error){
            console.log(error);
        }else{
            console.log("El correo se envió correctamente: " + info.response);
        }
    });
};

module.exports = {enviar_mail}