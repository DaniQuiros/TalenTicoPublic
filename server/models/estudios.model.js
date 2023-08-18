const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SchemaEstudio = new Schema({
  annoTitulo: { type: Number, required: true },
  institucion: { type: String, required: true },
  carrera: { type: String, required: true },
  gradoAcademico: { type: String, required: true },
});

const Estudio = mongoose.model("Estudio", SchemaEstudio, "estudios");

module.exports = Estudio;
