const listar_notificaciones = async(usuario)=>{
    let lista_notificaciones = [];

    await axios({
        method: 'get',
        url: `http://localhost:3000/api/listar-notificaciones?usuario=${usuario}`,
        responseType: 'json'
    })
    .then((res) => {
        lista_notificaciones = res.data.notificacionDB;
        //console.log(lista_notificaciones);
    })
    .catch((error) => {
        console.log(error);
    });

    return lista_notificaciones
}