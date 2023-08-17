const express = require("express");
const router = express.Router();

const controller = require("../controllers/empresa.controller");

// Crear Empresa
router.post("/empresa", controller.crearEmpresa);

// Listar Empresas
router.get("/empresa", controller.listarEmpresas);

// Obtener Información de Empresa
router.get("/empresa/get-info", controller.obtenerInformacion);

// Modificar Empresa
router.put("/empresa", controller.modificarEmpresa);

// Eliminar Empresa
router.delete("/empresa", controller.eliminarEmpresa);


module.exports = router;
