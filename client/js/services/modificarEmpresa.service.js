const obtener_empresa_cedula = async (cedula)=>{
    let empresa;

    try {
        const respuesta = await axios({
            method:'get',
            data:{cedula:cedula},
            url:'http://localhost:3000/api/buscar-persona-cedula',
            responseType:'json'
        });

        //console.log(respuesta.data.persona[0])
        persona = respuesta.data.persona;

    } catch (error) {
        console.log(error)
    }


    return persona;
}