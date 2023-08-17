const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const inicializarBaseDeDatos = require("./init-db");
const inicializarRutas = require("./routes");
require("dotenv").config();

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Iniciando la conexión con la base de datos
inicializarBaseDeDatos();

// Iniciando las rutas del servidor
inicializarRutas(app);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Escuchando en el puerto ${PORT}`);
});
