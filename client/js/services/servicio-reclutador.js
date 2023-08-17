// Registrar reclutador
const registrar_Reclutador= async(pNombre, pApellido, pGenero, pCorreo, pContrasenna)=>{
    await axios({
        method:"post",
        url:"http://localhost:3000/api/reclutador",
        responseType:"json",
        data:{
            nombre:pNombre,
            apellido:pApellido,
            genero:pGenero,
            correo:pCorreo,
            contrasenna:pContrasenna
        }
    })
    .then((res)=>{
        if(res.data.resultado == false){
            switch(res.data.error.code){
                case 11000:
                    Swal.fire({
                        title:'No se completó el registro',
                        text:'El usuario ya está registrado',
                        icon:'warning'
                    });
                    break;
            }
        }else{
            Swal.fire({
                title:'Usuario registrado exitosamente',
                icon:'success'
            });
        }
    })
    .then(()=>{
        setTimeout(()=>{
            window.location.href = 'homePageReclutador.html'
        },1500)
    })
    .catch((error)=>{
        console.log(error);
    })
}

// listar usuarios
const listar_Reclutador_BD = async() => {
    let lista_reclutadores = [];
    await axios({
        method:"get",
        url:"http://localhost:3000/api/reclutador",
        responseType:"json"
    })
    .then((res)=>{
        
        lista_reclutadores = res.data.resultado;
    })
    .catch((error)=>{
        console.log(error)
    })
    return lista_reclutadores
}

// Modificar usuario
const modificar_reclutador=async(pId, pNombre, pApellido, pIdentificacion, pCorreo, pGenero, pContrasenna, pFoto)=>{
    await axios({
        method:'put',
        url:'http://localhost:3000/api/reclutador',
        data:{
            _id:pId,
            nombre:pNombre,
            apellido:pApellido,
            identificacion:pIdentificacion,
            correo:pCorreo,
            genero:pGenero,
            contrasenna:pContrasenna,
            foto:pFoto
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
            window.location.href = 'homePageReclutador.html'
        },1000)
    })
    .catch((error)=>{
        console.log(error)
    })
};

//eliminar_usuario(_id)
const eliminar_reclutador = async(pId) => {
    await axios({
        method: "delete",
        url: "http://localhost:3000/api/reclutador",
        data: {
            _id: pId
        },
        responseType: "json"
    }).then((res) => {
        Swal.fire({
            title: "Operación exitosa",
            text: "Usuario eliminado exitosamente",
            icon: "success"
        });
    }).then(() => {
        setTimeout(()=>{
            window.location.href = "registroSesion.html"
        },1000)
        
    }).catch((err) => {
        console.log(err);
    })
}

// Agregar estudios
const agregar_estudios_reclutador = async(pAnnoTitulo, pInstitucion, pCarrera, pGradoAcademico, pId)=>{
    await axios({
        method:"post",
        url:"http://localhost:3000/api/reclutadorAgregarEstudios",
        responseType:"json",
        data:{
            annoTitulo:pAnnoTitulo,
            institucion:pInstitucion,
            carrera:pCarrera,
            gradoAcademico:pGradoAcademico,
            _id:pId
        }
    })
    .then((res)=>{
        Swal.fire({
            title:'Operación exitosa',
            text:'Estudios agregados',
            icon:'success'
        });
    })
    .then(()=>{
        window.location.href = 'modificarReclutador.html'
    })
    .catch((error)=>{
        console.log(error);
    })
}

// Agregar experiencia
const agregar_experiencia_reclutador = async(pAnnoIngreso, pAnnoSalida, pEmpresa, pPuesto, pId)=>{
    await axios({
        method:"post",
        url:"http://localhost:3000/api/reclutadorAgregarExperiencia",
        responseType:"json",
        data:{
            annoIngreso:pAnnoIngreso,
            annoSalida:pAnnoSalida,
            empresa:pEmpresa,
            puesto:pPuesto,
            _id:pId
        }
    })
    .then((res)=>{
        Swal.fire({
            title:'Operación exitosa',
            text:'Experiencia agregadas',
            icon:'success'
        });
    })
    .then(()=>{
        window.location.href = 'modificarReclutador.html'
    })
    .catch((error)=>{
        console.log(error);
    })
}