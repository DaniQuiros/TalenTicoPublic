const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SchemaNotificacion = new Schema({
  usuario: {
    type: String,
    required: true,
    unique: true
  },
  notificaciones: [
    {
      descripcion:{
        type: String,
        required: false
      },
      href: {
        type: String,
        require: false
      }
    }
  ]
});

const Notificacion = mongoose.model("Notificacion", SchemaNotificacion, "notificaciones");
module.exports = Notificacion;
