const crear_empleo= async(nombrePuesto, rangoSalario, requisitos, atributosCandidato,descripcionPuesto,tipo, empresaNombre, empresaid, empresa)=>{
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
            empresaid: empresaid,
            empresa: empresa
        }
    })
    .then((res)=>{

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
        console.log(error);
    })
}