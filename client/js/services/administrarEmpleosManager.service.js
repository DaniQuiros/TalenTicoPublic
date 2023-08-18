
const listar_candidatos_empleo_empresa = async(empresaid)=>{
    let listar_candidatos = [];

    await axios({
        method: 'get',
        url: `http://localhost:3000/api/listar-candidaturas-empresa?empresaid=${empresaid}`,
        responseType: 'json'
    })
    .then((res) => {
        listar_candidatos = res.data.AplicacionDB;
        console.log(res.data.AplicacionDB);
    })
    .catch((error) => {
        console.log(error);
    });

    return listar_candidatos
}