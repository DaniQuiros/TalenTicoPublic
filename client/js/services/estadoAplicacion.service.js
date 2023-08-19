const modificar_aplicacion =async(p_id, estado, candidato, puesto, correo)=>{

    await axios({
        method:'put',
        url:'http://localhost:3000/api/editar-aplicacion',
        data:{
            _id:p_id,
            estado:estado,
            candidato:candidato, 
            puesto:puesto, 
            correo:correo
        }
    })
    .then(()=>{
        Swal.fire({
            icon: "success",
            title: "Éxito",
            text: "La información se registró de forma correcta",
        
        });
    })
    .then(()=>{
        setTimeout(()=>{
            window.location.href = 'administrarEmpleosManager.html'
        },1000)
    })
    .catch((error)=>{
        console.log(error)
    })
};




const obtener_aplicacion = async (_id)=>{
    let Aplicacion;

    try {
        const respuesta = await axios({
            method:'get',
            params:{
                _id:_id
            },
            url: `http://localhost:3000/api/listar-aplicacion?_id=${_id}`,
            responseType:'json'
        });

        console.log(respuesta.data.Aplicacion)
        Aplicacion = respuesta.data.Aplicacion;

    } catch (error) {
        console.log(error)
    }
    

    return Aplicacion;
}

const crear_notificacion = async(usuario, descripcion,  href)=>{
    await axios({
        method:"post",
        url:"http://localhost:3000/api/crear-notificacion-usuario",
        responseType:"json",
        data:{
            usuario:usuario,
            descripcion:descripcion,
            href: href,
        }
    })
    .then((res)=>{
        if(res.data.resultado == false){
            switch(res.data.error.code){
                case 11000:
                    Swal.fire({
                        title:'No se completó el registro',
                        text:'La notificacin persona ya está registrada',
                        icon:'warning'
                    });
                    break;
            }
        }else{
            Swal.fire({
                icon: "success",
                title: "Éxito",
                text: "La información se registró de forma correcta",
            });
        }
    })
    .then(()=>{

        setTimeout(()=>{
            window.location.href = 'administrarEmpleosManager.html'
        },1000)
    })
    .catch((error)=>{
        console.log(error);
    })
}



