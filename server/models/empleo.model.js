// requerir mongoose
const mongoose = require('mongoose')

// crear un esquema
const SchemaEmpleo = new mongoose.Schema({
  nombrePuesto: { type: String, required: true, unique: false },
  rangoSalario: { type: Number, required: true, unique: false },
  requisitos: { type: String, required: true, unique: true },
  atributosCandidato: { type: String, required: true, unique: true },
  descripcionPuesto: { type: String, required: true, unique: true },
  estado: { type: String, default: "Activo" },
  empresaNombre: { type: String, required: false, unique: false },
});

module.exports = mongoose.model('Empleo', schema_empleo, 'empleo')