const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SchemaUsuario = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  apellido: {
    type: String,
    required: true,
  },
  genero: {
    type: Schema.Types.ObjectId,
    ref: "Genero",
  },
  correo: {
    type: String,
    required: true,
    unique: true,
  },
  contrasena: {
    type: String,
    required: true,
  },
  foto: { type: String },
  estudios: [
    {
      annoTitulo: { type: Number, require: true },
      institucion: { type: String, require: true },
      carrera: { type: String, require: true },
      gradoAcademico: { type: String, require: true },
    },
  ],
  experiencia: [
    {
      annoIngreso: { type: Number, require: true },
      annoSalida: { type: Number, require: true },
      empresa: { type: String, require: true },
      puesto: { type: String, require: true },
    },
  ],
  roles: [
    {
      type: Schema.Types.ObjectId,
      ref: "Rol",
    },
  ],
});

const Usuario = mongoose.model("Usuario", SchemaUsuario);
module.exports = Usuario;
