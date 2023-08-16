const db = require("../models");
const Empresa = db.empresa;

module.exports = {
  crearEmpresa: async (req, res) => {
    try {
      const empresa = await Empresa.create(req.body);
      const result = await empresa.save();
      res.status(201).json({
        status: 201,
        message: "Empresa creada exitosamente",
        data: result,
      });
    } catch (err) {
      console.error(err.message);
      res.status(501).json({
        status: 501,
        message: `Error al crear la empresa: ${err.message}`,
      });
    }
  },
  listarEmpresas: async (req, res) => {
    try {
      const empresas = await Empresa.find();
      res.status(200).json({
        status: 200,
        message: "Empresas obtenidas exitosamente",
        data: empresas,
      });
    } catch (err) {
      console.error(err);
      res.status(501).json({
        status: 501,
        message: `Error al listar las empresas: ${err.message}`,
      });
    }
  },
  modificarEmpresa: async (req, res) => {
    try {
      const empresa = await Empresa.findByIdAndUpdate(
        req.body["_id"],
        req.body,
        { new: true }
      );

      if (!empresa) {
        res.status(404).json({
          status: 404,
          message: "No se encontró la empresa",
        });
        return;
      }

      res.status(200).json({
        status: 200,
        message: "Empresa modificada exitosamente",
        data: empresa,
      });
    } catch (err) {
      console.error(err);
      res.status(501).json({
        status: 501,
        message: `Error al modificar la empresa: ${err.message}`,
      });
    }
  },
  eliminarEmpresa: async (req, res) => {
    try {
      const empresa = await Empresa.findByIdAndDelete(req.body["_id"]);

      if (!empresa) {
        res.status(404).json({
          status: 404,
          message: "No se encontró la empresa",
        });
        return;
      }

      res.status(200).json({
        status: 200,
        message: "Empresa eliminada exitosamente",
        data: empresa,
      });
    } catch (err) {
      console.error(err);
      res.status(501).json({
        status: 501,
        message: `Error al eliminar la empresa: ${err.message}`,
      });
    }
  },
};
