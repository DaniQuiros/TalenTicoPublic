

const listar_invitaciones = async(candidato)=>{
    let listar_invitaciones = [];

    await axios({
        method: 'get',
        url: `http://localhost:3000/api/listar-InvitacionEmpleos-candidato?candidato=${candidato}`,
        responseType: 'json'
    })
    .then((res) => {
        listar_invitaciones = res.data.InvitacionEmpleoDB;
        console.log(listar_invitaciones);
    })
    .catch((error) => {
        console.log(error);
    });

    return listar_invitaciones
}