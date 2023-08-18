const mongoose = require('mongoose')

const schema_manager = new mongoose.Schema({
    
    cedula:{type:String, require:false, unique:true},
    nombre:{type:String, require:true, unique:false},
    apellido:{type:String, require:true, unique:false},
    genero:{type:String, require:true, unique:false},
    correo:{type:String, required:true, unique:true},
    contrasenna:{type:String, require:true, unique:false},
    foto: { type: String, required: false, unique: false },
    estudios: [
        {annoTitulo:{type:Number, require:false, unique:false},
         institucion:{type:String, require:false, unique:false},
         carrera:{type:String, require:false, unique:false},
         gradoAcademico:{type:String,require:false,unique:false}
        },
    ],
    experiencia:[
        {annoIngreso:{type:Number, require:false, unique:false},
         annoSalida:{type:Number, require:false, unique:false},
         empresa:{type:String, require:false, unique:false},
         puesto:{type:String,require:false,unique:false}
        },
    ],
    estado:{type:String, default:'Inactivo'},
    rol:{type:String, default:'Manager'},
    empresa:{type:String, default:'porDefinir'},
})

module.exports = mongoose.model('Manager', schema_manager, 'manager')