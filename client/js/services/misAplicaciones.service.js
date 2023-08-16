

const listar_aplicaciones = async(candidato)=>{
    let lista_aplicaciones = [];

    await axios({
        method:'get',
        url:'http://localhost:3000/api/listar-aplicaciones',
        data:{candidato:candidato},
        responseType:'json'
    })
    .then((res)=>{
        //console.log(res.data.resultado[0])
        lista_aplicaciones = res.body.AplicacionDB;
    })
    .catch((error)=>{
        console.log(error)
    })

    return lista_aplicaciones
}