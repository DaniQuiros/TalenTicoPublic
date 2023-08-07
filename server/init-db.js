const mongoose = require("mongoose");

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
