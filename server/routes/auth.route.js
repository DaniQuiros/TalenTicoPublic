const express = require("express");
const router = express.Router();
const { checkRolesExisted } = require("../middlewares");
const controller = require("../controllers/auth.controller");

// Agregando el manejo del token dentro del encabezado
router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});
router.post("/auth/signup", checkRolesExisted, controller.signup);
router.post("/auth/signupEmpresa", checkRolesExisted, controller.signupEmpresa);
router.post("/auth/signin", controller.signin);

module.exports = router;
