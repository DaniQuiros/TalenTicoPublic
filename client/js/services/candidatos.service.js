export async function listarCandidatos() {
  let response = {};
  const token = sessionStorage.getItem("accessToken");

  try {
    response = await axios.get("http://localhost:3000/api/candidatos", {
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
