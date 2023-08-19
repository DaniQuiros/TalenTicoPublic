// requerir mongoose
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// crear un esquema
const SchemaEmpleo = new Schema({
  nombrePuesto: { type: String, required: true, unique: false },
  rangoSalario: { type: String, required: true, unique: false },
  requisitos: { type: String, required: true, unique: false },
  atributosCandidato: { type: String, required: true, unique: false },
  descripcionPuesto: { type: String, required: false, unique: false },
  tipo: { type: String, required: true },
  empresaNombre: { type: String, required: false, unique: false },
  empresa: { type: Schema.Types.ObjectId, ref: "Empresa" },
});

module.exports = mongoose.model("Empleo", SchemaEmpleo, "empleos");
