const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.empresa = require("./empresa.model");
db.rol = require("./rol.model");
db.usuario = require("./usuario.model");

db.ROLES = ["usuario", "manager", "reclutador", "admin"];

module.exports = db;
