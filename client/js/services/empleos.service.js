export async function listarEmpleos() {
  let response = {};
  const token = localStorage.getItem("accessToken");

  try {
    response = await axios({
      method: "get",
      url: "http://localhost:3000/api/empleo",
      headers: {
        Authorization: `x-access-token ${token}`,
      },
      responseType: "json",
    });
  } catch (error) {
    console.log(error);
  }

  return response;
}

export async function obtenerEmpleo(id) {
  let response = {};
  const token = localStorage.getItem("accessToken");

  try {
    response = await axios.get(`http://localhost:3000/api/empleo/${id}`, {
      headers: {
        "x-access-token": token,
      },
      responseType: "json",
    });
  } catch (error) {
    console.log(error);
  }

  return response;
}
