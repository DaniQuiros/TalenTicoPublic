const jwt = require("jsonwebtoken");
const db = require("../models");
const Usuario = db.usuario;
const Rol = db.rol;

const verificarToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No se incluyó un token.",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "El token no es válido.",
      });
    }

    req.userId = decoded.id;
    next();
  });
};

const verificarRol = async (rol, req, res, next) => {
  try {
    const usuario = await Usuario.findById(req.userId);

    if (!usuario) {
      res.status(403).send({
        message: "No se encontró el usuario.",
      });
      return;
    }

    const roles = await Rol.find({ _id: { $in: usuario.roles } });

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].nombre === rol) {
        next();
        return;
      }
    }

    res.status(403).send({
      message: "No tiene permisos para acceder a esta ruta.",
    });
    return;
  } catch (err) {
    return res.status(500).send({
      message: err.message,
    });
  }
};

const esAdmin = (req, res, next) => {
  verificarRol("admin", req, res, next);
};

const esManager = (req, res, next) => {
  verificarRol("manager", req, res, next);
};

const esReclutador = (req, res, next) => {
  verificarRol("reclutador", req, res, next);
};

module.exports = {
  verificarToken,
  esAdmin,
  esManager,
  esReclutador,
};
