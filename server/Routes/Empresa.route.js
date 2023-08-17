const express = require("express");
const router = express.Router();

const controller = require("../controllers/empresa.controller");

// Crear Empresa
router.post("/", controller.crearEmpresa);

// Listar Empresas
router.get("/", controller.listarEmpresas);
router.get("/get-info", controller.obtenerInformacion);

// Modificar Empresa
router.put("/", controller.modificarEmpresa);

// Eliminar Empresa
router.delete("/", controller.eliminarEmpresa);


module.exports = router;
