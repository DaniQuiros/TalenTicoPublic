const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SchemaEmpresa = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  cedula: {
    type: String,
    required: true,
    unique: true,
  },
  descripcion: {
    type: String,
    default: "",
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
});

const Empresa = mongoose.model("Empresa", SchemaEmpresa);
module.exports = Empresa;
