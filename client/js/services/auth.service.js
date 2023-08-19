export async function signin(data) {
  let response = {};

  try {
    response = await axios({
      method: "post",
      url: "http://localhost:3000/api/auth/signin",
      data,
      responseType: "json",
    });

    if (response.status === 200) {
      sessionStorage.setItem("accessToken", response.data.accessToken);
      sessionStorage.setItem("correo", response.data.correo)
    }
  } catch (error) {
    console.log(error);
  }

  return response;
}

export function signout() {
  sessionStorage.clear();
  window.location.href = "inicioSesionGeneral.html";
}

export async function signup(data) {
  let response = {};

  try {
    response = await axios({
      method: "post",
      url: "http://localhost:3000/api/auth/signup",
      data,
      responseType: "json",
    });
  } catch (error) {
    console.log(error);
  }

  return response;
}
