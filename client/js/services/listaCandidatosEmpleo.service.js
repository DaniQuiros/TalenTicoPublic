

const listar_invitaciones_empleo = async(empleoid)=>{
    let lista_invitaciones = [];

    await axios({
        method: 'get',
        url: `http://localhost:3000/api/listar-InvitacionEmpleos-empleo?empleoid=${empleoid}`,
        responseType: 'json'
    })
    .then((res) => {
        lista_invitaciones = res.data.InvitacionEmpleoDB;
        //console.log(res.data.InvitacionEmpleoDB);
    })
    .catch((error) => {
        console.log(error);
    });

    return lista_invitaciones
}