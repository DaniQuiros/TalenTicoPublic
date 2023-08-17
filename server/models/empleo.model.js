// requerir mongoose
const mongoose = require('mongoose')

// crear un esquema
const schema_empleo = new mongoose.Schema({
    
    nombrePuesto:{type:String, require:true, unique:false},
    rangoSalario:{type:Number, require:true, unique:false},
    requisitos:{type:String, required:true, unique:true},
    atributosCandidato:{type:String, required:true, unique:true},
    descripcionPuesto:{type:String, required:true, unique:true},
    estado:{type:String, default:'Activo'},
})

module.exports = mongoose.model('Empleo', schema_empleo, 'empleo')