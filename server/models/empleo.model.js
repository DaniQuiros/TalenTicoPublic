// requerir mongoose
const mongoose = require('mongoose')

// crear un esquema
const SchemaEmpleo = new mongoose.Schema({
  nombrePuesto: { type: String, required: true, unique: false },
  rangoSalario: { type: String, required: true, unique: false },
  requisitos: { type: String, required: true, unique: false },
  atributosCandidato: { type: String, required: true, unique: false },
  descripcionPuesto: { type: String, required: false, unique: false },
  tipo: { type: String, required:true},
  empresaNombre: { type: String, required: false, unique: false},
  empresaid: {type: String, required:false, unique:false}
});

module.exports = mongoose.model('Empleo', schema_empleo, 'empleo')