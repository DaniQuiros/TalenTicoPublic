const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SchemaExperiencia = new Schema({
  annoIngreso: { type: Number },
  annoSalida: { type: Number },
  empresa: { type: String, required: true },
  puesto: { type: String, required: true },
});

const Experiencia = mongoose.model(
  "Experiencia",
  SchemaExperiencia,
  "experiencias"
);

module.exports = Experiencia;
