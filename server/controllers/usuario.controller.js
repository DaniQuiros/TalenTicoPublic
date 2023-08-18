const db = require("../models");
const Usuario = db.usuario;

const actualizarUsuario = (req, res) => {};

const buscarUsuario = async (req, res) => {
  const id = req.query.id || req.userId;

  const usuario = await Usuario.findById(id)
    .populate("roles", "-__v")
    .populate("generos", "-__v");

  if (!usuario) {
    return res.status(404).send({
      message: "Usuario no encontrado",
    });
  }
};

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
