const modificar_aplicacion =async(p_id, estado)=>{

    await axios({
        method:'put',
        url:'http://localhost:3000/api/editar-aplicacion',
        data:{
            _id:p_id,
            estado:estado
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
            params:{_id:_id},
            url: `http://localhost:3000/api/listar-aplicacion?_id=${_id}`,
            responseType:'json'
        });

        console.log(respuesta.data.Aplicacion)
        persona = respuesta.data.Aplicacion;

    } catch (error) {
        console.log(error)
    }


    return Aplicacion;
}