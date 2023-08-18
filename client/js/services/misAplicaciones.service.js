

const listar_aplicaciones = async(candidato)=>{
    let lista_aplicaciones = [];

    await axios({
        method: 'get',
        url: `http://localhost:3000/api/listar-aplicaciones?candidato=${candidato}`,
        responseType: 'json'
    })
    .then((res) => {
        lista_aplicaciones = res.data.AplicacionDB;
        console.log(lista_aplicaciones);
    })
    .catch((error) => {
        console.log(error);
    });

    return lista_aplicaciones
}