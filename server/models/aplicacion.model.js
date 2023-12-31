const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SchemaAplicacion = new Schema({
  candidato: {
    type: String,
    required: true,
  },
  correo: {
    type: String,
    required: false,
  },
  puesto: {
    type: String,
    required: false,
  },
  estado: {
    type: String,
    required: false,
  },
  empleoid: {
    type: String,
    required: true,
    default: "test",
  },
  empresaid: {
    type: String,
    require: false,
  },
});

const Aplicacion = mongoose.model(
  "Aplicacion",
  SchemaAplicacion,
  "aplicaciones"
);
module.exports = Aplicacion;
