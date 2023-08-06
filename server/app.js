const express = require("express");
const createError = require("http-errors");
const dotenv = require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Iniciando la conexión con la base de datos
require("./init-db")();

// Manejar rutas no encontradas devolviendo error 404
app.use((req, res, next) => {
  next(createError(404, "No encontrado"));
});

// Manejar errores
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Escuchando en el puerto ${PORT}`);
});
