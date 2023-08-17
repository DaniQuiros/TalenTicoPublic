// Registrar manager
const registrar_Manager= async(pNombre, pApellido, pGenero, pCorreo, pContrasenna)=>{
    await axios({
        method:"post",
        url:"http://localhost:3000/api/manager",
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
            window.location.href = 'homePageManager.html'
        },1500)
    })
    .catch((error)=>{
        console.log(error);
    })
}

// listar manager
const listar_Manager_BD = async() => {
    let lista_managers = [];
    await axios({
        method:"get",
        url:"http://localhost:3000/api/manager",
        responseType:"json"
    })
    .then((res)=>{
        
        lista_managers = res.data.resultado;
    })
    .catch((error)=>{
        console.log(error)
    })
    return lista_managers
}

// Modificar manager
const modificar_manager=async(pId, pNombre, pApellido, pIdentificacion, pCorreo, pGenero, pContrasenna, pFoto)=>{
    await axios({
        method:'put',
        url:'http://localhost:3000/api/manager',
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
            window.location.href = 'homePageManager.html'
        },1000)
    })
    .catch((error)=>{
        console.log(error)
    })
};

//eliminar_manager(_id)
const eliminar_manager = async(pId) => {
    await axios({
        method: "delete",
        url: "http://localhost:3000/api/manager",
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
const agregar_estudios_manager = async(pAnnoTitulo, pInstitucion, pCarrera, pGradoAcademico, pId)=>{
    await axios({
        method:"post",
        url:"http://localhost:3000/api/mangerAgregarEstudios",
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
        window.location.href = 'modificarManager.html'
    })
    .catch((error)=>{
        console.log(error);
    })
}

// Agregar experiencia
const agregar_experiencia_manager = async(pAnnoIngreso, pAnnoSalida, pEmpresa, pPuesto, pId)=>{
    await axios({
        method:"post",
        url:"http://localhost:3000/api/managerAgregarExperiencia",
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
        window.location.href = 'modificarManager.html'
    })
    .catch((error)=>{
        console.log(error);
    })
}