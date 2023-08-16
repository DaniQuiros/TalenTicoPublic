const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SchemaRol = new Schema({
  nombre: {
    type: String,
    required: true,
    unique: true,
  },
});

const Rol = mongoose.model("Rol", SchemaRol);
module.exports = Rol;
