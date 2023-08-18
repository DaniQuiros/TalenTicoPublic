const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SchemaAplicacion = new Schema({
  candidato: {
    type: String,
    required: true,
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
    default:"test"
  }
});

const Aplicacion = mongoose.model(
  "Aplicacion",
  SchemaAplicacion,
  "aplicaciones"
);
module.exports = Aplicacion;
