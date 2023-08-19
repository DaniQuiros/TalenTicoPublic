const txtCandidato = document.querySelector("#candidato")
const txtPuesto = document.querySelector("#puesto")
const txtEstado = document.querySelector("#estado")
const btn_guardar = document.querySelector("#guardar")


const llenar_campos = async() => {
    let id = localStorage.getItem("id_mongo")
    const aplicacion = await obtener_aplicacion(id);
    console.log(aplicacion);
 
    //console.log(persona[0].foto);
    txtCandidato.value = aplicacion[0].candidato;
    txtPuesto.value = aplicacion[0].puesto;
    txtEstado.value = aplicacion[0].estado;
    router.put('/editar-aplicacion',function(req,res){

        let body = req.body;
        
        let candidato =body.candidato
        let puesto =body.puesto
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
}


const editar_estado_aplicacion = async ()=>{
    let id = localStorage.getItem("id_mongo")
    const aplicacion = await obtener_aplicacion(id);
    let estado = txtEstado.value

    let candidato = aplicacion[0].candidato;
    let puesto = aplicacion[0].puesto;
    let correo = aplicacion[0].correo;
    console.log(aplicacion)
    modificar_aplicacion(id,estado, candidato, puesto, correo)
}

-
llenar_campos()
btn_guardar.addEventListener("click", editar_estado_aplicacion)