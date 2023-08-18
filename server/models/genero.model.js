const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SchemaGenero = new Schema({
  nombre: {
    type: String,
    required: true,
    unique: true,
  },
});

const Genero = mongoose.model("Genero", SchemaGenero, "generos");
module.exports = Genero;
