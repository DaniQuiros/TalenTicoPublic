const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SchemaUsuario = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  apellido: {
    type: String,
    required: true,
  },
  genero: {
    type: String,
    required: true,
  },
  correo: {
    type: String,
    required: true,
    unique: true,
  },
  contrasena: {
    type: String,
    required: true,
  },
  foto: 
  { type: String, 
    required: false, 
    unique: false 
  },

  roles: [
    {
      type: Schema.Types.ObjectId,
      ref: "Rol",
    },
  ],
});

const Usuario = mongoose.model("Usuario", SchemaUsuario);
module.exports = Usuario;
