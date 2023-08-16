const { authJwt } = require("../middlewares");
const controller = require("../controllers/usuario.controller");

module.exports = (app) => {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/todos", controller.accesoTotal);
  app.get(
    "/api/test/usuario",
    [authJwt.verificarToken],
    controller.accesoUsuario
  );
  app.get(
    "/api/test/manager",
    [authJwt.verificarToken, authJwt.esManager],
    controller.accesoManager
  );
  app.get(
    "/api/test/reclutador",
    [authJwt.verificarToken, authJwt.esReclutador],
    controller.accesoReclutador
  );
  app.get(
    "/api/test/admin",
    [authJwt.verificarToken, authJwt.esAdmin],
    controller.accesoAdmin
  );
};
