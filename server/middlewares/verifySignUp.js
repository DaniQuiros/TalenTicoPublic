const db = require("../models");
const ROLES = db.ROLES;

const checkRolesExisted = (req, res, next) => {
  if (req.usuario.roles) {
    for (let i = 0; i < req.usuario.roles.length; i++) {
      if (!ROLES.includes(req.usuario.roles[i])) {
        res.status(400).send({
          message: `El rol ${req.usuario.roles[i]} no existe`,
        });
        return;
      }
    }
  }

  next();
};

module.exports = {
  checkRolesExisted,
};
