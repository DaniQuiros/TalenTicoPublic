const db = require("../models");
const Genero = db.genero;
const Usuario = db.usuario;

const actualizarUsuario = async (req, res) => {
  try {
    const data = {};
    req.body.nombre && (data.nombre = req.body.nombre);
    req.body.apellido && (data.apellido = req.body.apellido);
    req.body.correo && (data.correo = req.body.correo);
    req.body.foto && (data.foto = req.body.foto);
    req.body.estudios && (data.estudios = req.body.estudios);
    req.body.experiencia && (data.experiencia = req.body.experiencia);

    if (req.body.genero) {
      const genero = await Genero.findOne({
        nombre: req.body.genero.toLowerCase(),
      });

      data.genero = genero._id;
    }

    const usuario = await Usuario.findByIdAndUpdate(req.userId, data, {
      new: true,
    }).populate("genero", "-__v");

    if (!usuario) {
      return res.status(404).send({
        message: "Usuario no encontrado",
      });
    }

    return res.status(200).send({
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      genero: usuario.genero.nombre,
      correo: usuario.correo,
      foto: usuario.foto,
      experiencia: usuario.experiencia,
      estudios: usuario.estudios,
    });
  } catch (error) {
    return res.status(501).send({
      message: "Error al actualizar el usuario",
    });
  }
};

const buscarUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.userId).populate(
      "genero",
      "-__v"
    );

    if (!usuario) {
      return res.status(404).send({
        message: "Usuario no encontrado",
      });
    }

    return res.status(200).send({
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      genero: usuario.genero.nombre,
      correo: usuario.correo,
      foto: usuario.foto,
      experiencia: usuario.experiencia,
      estudios: usuario.estudios,
    });
  } catch (error) {
    return res.status(501).send({
      message: "Error al buscar el usuario",
    });
  }
};

const listarCandidatos = async (req, res) => {
  try {
    const usuarios = await Usuario.find()
      .select({ contrasena: 0, roles: 0, __v: 0 })
      .populate("genero", { _id: 0, nombre: 1 });

    return res.status(200).send(usuarios);
  } catch (error) {
    return res.status(501).send({
      message: "Error al buscar los usuarios",
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
  actualizarUsuario,
  buscarUsuario,
  listarCandidatos,
};
