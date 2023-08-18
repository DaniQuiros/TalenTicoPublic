const RutaAuth = require("./auth.route");
const RutaEmpleo = require("./empleo.route");
const RutaEmpresa = require("./empresa.route");
const RutaNotificacion = require("./notificacion.route");
const RutaAplicacion = require("./aplicacion.route");
const RutaInvitacionEmpleo = require("./invitacionEmpleo.route");
const RutaUsuario = require("./usuario.route");

module.exports = function (app) {
  app.use("/api", RutaAuth);
  app.use("/api", RutaEmpleo);
  app.use("/api", RutaEmpresa);
  app.use("/api", RutaNotificacion);
  app.use("/api", RutaAplicacion);
  app.use("/api", RutaInvitacionEmpleo);
  app.use("/api", RutaUsuario);

  // Manejar rutas no encontradas devolviendo error 404
  app.use((req, res) => {
    res.status(404);
    res.send({
      error: {
        status: 404,
        message: "Ruta no encontrada",
      },
    });
  });

  // Manejar errores
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
      error: {
        status: err.status || 500,
        message: err.message,
      },
    });
  });
};
