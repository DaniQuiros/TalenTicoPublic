export async function aplicarEmpleo(id) {
  let response = {};
  const token = sessionStorage.getItem("accessToken");

  try {
    response = await axios.post(
      "http://localhost:3000/api/crear-aplicacion-usuario",
      { empleoId: id },
      {
        headers: {
          "x-access-token": token,
        },
        responseType: "json",
      }
    );
  } catch (error) {
    console.log(error);
  }

  return response;
}
