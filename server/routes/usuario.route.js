const express = require("express");
const router = express.Router();
const { authJwt } = require("../middlewares");
const controller = require("../controllers/usuario.controller");

router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.get("/test/todos", controller.accesoTotal);
router.get("/test/usuario", [authJwt.verificarToken], controller.accesoUsuario);
router.get(
  "/test/manager",
  [authJwt.verificarToken, authJwt.esManager],
  controller.accesoManager
);
router.get(
  "/test/reclutador",
  [authJwt.verificarToken, authJwt.esReclutador],
  controller.accesoReclutador
);
router.get(
  "/test/admin",
  [authJwt.verificarToken, authJwt.esAdmin],
  controller.accesoAdmin
);

module.exports = router;
