// Registrar empleos
const registrar_empleo= async(pNombrePuesto, pRangoSalario, pRequisitos, pAtributosCandidato, pDescripcionPuesto, pTipo, pEmpresaId)=>{
    await axios({
        method:"post",
        url:"http://localhost:3000/api/empleo",
        responseType:"json",
        data:{
            nombrePuesto:pNombrePuesto,
            rangoSalario:pRangoSalario,
            requisitos:pRequisitos,
            atributosCandidato:pAtributosCandidato,
            descripcionPuesto:pDescripcionPuesto,
            tipo:pTipo,
            empresaId:pEmpresaId,
        }
    })
    .then((res)=>{
        if(res.data.resultado == false){
            switch(res.data.error.code){
                case 11000:
                    Swal.fire({
                        title:'No se completó el registro',
                        text:'El empleo ya está registrado',
                        icon:'warning'
                    });
                    break;
            }
        }else{
            Swal.fire({
                title:'Empleo registrado exitosamente',
                icon:'success'
            });
        }
    })
    .then(()=>{
        setTimeout(()=>{
            window.location.href = 'crearEmpleo.html'
        },1500)
    })
    .catch((error)=>{
        console.log(error);
    })
}

// listar empleos
const listar_empleo_BD = async() => {
    let lista_empleos = [];
    await axios({
        method:"get",
        url:"http://localhost:3000/api/empleo",
        responseType:"json"
    })
    .then((res)=>{
        
        lista_empleos = res.data.resultado;
    })
    .catch((error)=>{
        console.log(error)
    })
    return lista_empleos
}

// Modificar empleos
const modificar_empleo=async(pId, pNombrePuesto, pRangoSalario, pRequisitos, pAtributosCandidato, pDescripcionPuesto, pTipo, pEmpresaId)=>{
    await axios({
        method:'put',
        url:'http://localhost:3000/api/empleo',
        data:{
            _id:pId,
            nombrePuesto:pNombrePuesto,
            rangoSalario:pRangoSalario,
            requisitos:pRequisitos,
            atributosCandidato:pAtributosCandidato,
            descripcionPuesto:pDescripcionPuesto,
            tipo:pTipo,
            empresaId:pEmpresaId,
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
            window.location.href = 'crearEmpleo.html'
        },1000)
    })
    .catch((error)=>{
        console.log(error)
    })
};

//eliminar_empleos(_id)
const eliminar_reclutador = async(pId) => {
    await axios({
        method: "delete",
        url: "http://localhost:3000/api/empleo",
        data: {
            _id: pId
        },
        responseType: "json"
    }).then((res) => {
        Swal.fire({
            title: "Operación exitosa",
            text: "Empleo eliminado exitosamente",
            icon: "success"
        });
    }).then(() => {
        setTimeout(()=>{
            window.location.href = "crearEmpleo.html"
        },1000)
        
    }).catch((err) => {
        console.log(err);
    })
}