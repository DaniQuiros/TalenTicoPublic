
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



const listar_empleo_empresa = async(empresaid)=>{
    let listar_candidatos = [];

    await axios({
        method: 'get',
        url: `http://localhost:3000/api/listar-empleos-empresa?empresaid=${empresaid}`,
        responseType: 'json'
    })
    .then((res) => {
        listar_candidatos = res.data.EmpleoDB;
        console.log(res.data.EmpleoDB);
    })
    .catch((error) => {
        console.log(error);
    });

    return listar_candidatos
}


const eliminar_empleo = async(pid) => {
    await axios({
        method: "delete",
        url: "http://localhost:3000/api/empleo",
        data: {
            _id: pid
        },
        responseType: "json"
    }).then((res) => {
        Swal.fire({
            title: "Operación exitosa",
            text: "Empleo eliminado exitosamente",
            icon: "success"
        });
    }).then(() => {
        setTimeout(()=>{
            window.location.href = "#"
        },1000)
        
    }).catch((err) => {
        console.log(err);
    })
}