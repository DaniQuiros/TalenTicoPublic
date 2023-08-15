const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SchemaAplicacion = new Schema({
  candidato: {
    type: String,
    required: true,
  },
  detalles:[
    {
      puesto: {
        type: String,
        required: false,
      },
      estado:{
        type: String,
        required: false
      }
    }
    
  ]

});

const Aplicacion = mongoose.model("Aplicacion", SchemaAplicacion, "aplicaciones");
module.exports = Aplicacion;
