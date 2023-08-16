const accesoTotal = (req, res) => {
  res.status(200).send({
    message: "Contenido Público",
  });
};

const accesoUsuario = (req, res) => {
  res.status(200).send({
    message: "Contenido de usuarios",
  });
};

const accesoManager = (req, res) => {
  res.status(200).send({
    message: "Contenido de managers",
  });
};

const accesoReclutador = (req, res) => {
  res.status(200).send({
    message: "Contenido de reclutadores",
  });
};

const accesoAdmin = (req, res) => {
  res.status(200).send({
    message: "Contenido de admins",
  });
};

module.exports = {
  accesoTotal,
  accesoUsuario,
  accesoManager,
  accesoReclutador,
  accesoAdmin,
};
