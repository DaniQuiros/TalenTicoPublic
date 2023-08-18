const crear_empleo= async(nombrePuesto, rangoSalario, requisitos, atributosCandidato,descripcionPuesto,tipo, empresaNombre, empresaid)=>{
    await axios({
        method:"post",
        url:"http://localhost:3000/api/empleo",
        responseType:"json",
        data:{
            nombrePuesto:nombrePuesto,
            rangoSalario:rangoSalario,
            requisitos: requisitos,
            atributosCandidato: atributosCandidato,
            descripcionPuesto: descripcionPuesto,
            tipo: tipo,
            empresaNombre: empresaNombre,
            empresaid: empresaid
        
        }
    })
    .then((res)=>{
        if(res.data.resultado == false){
            switch(res.data.error.code){
                case 11000:
                    Swal.fire({
                        title:'No se completó el registro',
                        text:'La persona ya está registrada',
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