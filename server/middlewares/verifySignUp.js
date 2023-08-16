const db = require("../models");
const ROLES = db.ROLES;

const checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: `El rol ${req.body.roles[i]} no existe`,
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
