const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.aplicacion = require("./aplicacion.model");
db.empleo = require("./empleo.model");
db.empresa = require("./empresa.model");
db.genero = require("./genero.model");
db.invitacionEmpleo = require("./invitacionEmpleo.model");
db.notificacion = require("./notificacion.model");
db.reclutador = require("./reclutador.model");
db.rol = require("./rol.model");
db.usuario = require("./usuario.model");

db.ROLES = ["usuario", "manager", "reclutador", "admin"];
db.GENEROS = ["masculino", "femenino", "prefiero no decir"];

module.exports = db;
