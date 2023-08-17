export async function listarEmpleos() {
  let response = {};

  try {
    response = await axios.get(url);
  } catch (error) {
    console.log(error);
  }
}
