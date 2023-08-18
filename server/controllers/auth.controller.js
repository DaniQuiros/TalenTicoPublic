const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../models");
const Usuario = db.usuario;
const Rol = db.rol;

const signup = async (req, res) => {
  try {
    const usuario = new Usuario({
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      correo: req.body.correo,
      contrasena: bcrypt.hashSync(req.body.contrasena),
    });

    await usuario.save();

    if (req.body.roles) {
      const roles = await Rol.find({ nombre: { $in: req.body.roles } });

      usuario.roles = roles.map((rol) => rol._id);
      await usuario.save();
    } else {
      const rol = await Rol.findOne({ nombre: "usuario" });

      usuario.roles = [rol._id];
      await usuario.save();
    }

    if (req.body.genero) {
      const genero = await Genero.findOne({
        nombre: req.body.genero.toLowerCase(),
      });

      usuario.genero = genero._id;
      await usuario.save();
    } else {
      const genero = await Genero.findOne({ nombre: "prefiero no decir" });

      usuario.genero = genero._id;
      await usuario.save();
    }

    res.status(201).json({
      message: "Usuario creado correctamente",
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
    return;
  }
};

const signin = async (req, res) => {
  try {
    const usuario = await Usuario.findOne({ correo: req.body.correo }).populate(
      "roles",
      "generos",
      "-__v"
    );

    if (!usuario) {
      res.status(404).send({
        message: "Usuario no encontrado",
      });
      return;
    }

    const contrasenaValida = await bcrypt.compare(
      req.body.contrasena,
      usuario.contrasena
    );

    if (!contrasenaValida) {
      res.status(401).send({
        accessToken: null,
        message: "Credenciales incorrectas",
      });
      return;
    }

    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, {
      algorithm: "HS256",
      allowInsecureKeySizes: true,
      expiresIn: 86400, // 24 horas
    });

    const autorizaciones = [];

    for (let i = 0; i < usuario.roles.length; i++) {
      autorizaciones.push("ROL_" + usuario.roles[i].nombre.toUpperCase());
    }

    res.status(200).json({
      id: usuario._id,
      correo: usuario.correo,
      accessToken: token,
      message: "Usuario autenticado correctamente",
      roles: autorizaciones,
    });
  } catch (err) {
    res.status(500).send({
      message: "Error al verificar usuario",
    });
    return;
  }
};

module.exports = { signin, signup };
