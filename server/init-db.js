const db = require("./models");
const mongoose = db.mongoose;
const Genero = db.genero;
const Rol = db.rol;
const ROLES = db.ROLES;
const GENEROS = db.GENEROS;

async function initRoles() {
  try {
    const count = await Rol.estimatedDocumentCount();

    if (count > 0) {
      return;
    }

    ROLES.forEach(async (rol) => {
      try {
        await new Rol({ nombre: rol }).save();

        console.log(`Añadido el rol de ${rol} a la colección de roles`);
      } catch (err) {
        console.log(err);
        return;
      }
    });
  } catch (err) {
    console.log(err);
    return;
  }
}

async function initGeneros() {
  try {
    const count = await Genero.estimatedDocumentCount();

    if (count > 0) {
      return;
    }

    GENEROS.forEach(async (genero) => {
      try {
        await new Genero({ nombre: genero }).save();

        console.log(`Añadido el genero de ${genero} a la colección de generos`);
      } catch (err) {
        console.log(err);
        return;
      }
    });
  } catch (err) {
    console.log(err);
    return;
  }
}

module.exports = (app) => {
  mongoose
    .connect(process.env.MONGODB_URI, {
      dbName: process.env.DB_NAME,
      user: process.env.DB_USER,
      pass: process.env.DB_PASS,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Conectado a MongoDB");
      initRoles();
      initGeneros();
    })
    .catch((err) => {
      console.log(err.message);
    });

  mongoose.connection.on("connected", () => {
    console.log("Mongoose se ha conectado a MongoDB");
  });

  mongoose.connection.on("error", (err) => {
    console.log(err.message);
  });

  mongoose.connection.on("disconnected", () => {
    console.log("Mongoose se ha desconectado de MongoDB");
  });

  process.on("SIGINT", () => {
    mongoose.connection.close(() => {
      console.log(
        "Mongoose se ha desconectado de MongoDB debido al cierre de aplicación"
      );
      process.exit(0);
    });
  });
};
