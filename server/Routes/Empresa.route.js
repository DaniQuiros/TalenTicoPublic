const express = require("express");
const router = express.Router();

const ControllerEmpresa = require("../Controllers/Empresa.controller");

// Crear Empresa
router.post("/", ControllerEmpresa.crearEmpresa);

// Listar Empresas
router.get("/", ControllerEmpresa.listarEmpresas);

// Modificar Empresa
router.put("/", ControllerEmpresa.modificarEmpresa);

// Eliminar Empresa
router.delete("/", ControllerEmpresa.eliminarEmpresa);

module.exports = router;
