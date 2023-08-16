const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Iniciando la conexión con la base de datos
require("./init-db")();

// Rutas
const RutaEmpresa = require("./routes/empresa.route");
const RutaNotificacion = require("./Routes/Notificacion.route");
const RutaAplicacion = require ("./Routes/Aplicacion.route");
const RutaInvitacionEmpleo = require ("./Routes/InvitacionEmpleo.route");

require("./routes/auth.route")(app);
require("./routes/usuario.route")(app);
app.use("/api/empresa", RutaEmpresa);
app.use("/api", RutaNotificacion);
app.use("/api", RutaAplicacion)
app.use("/api", RutaInvitacionEmpleo)

// Manejar rutas no encontradas devolviendo error 404
app.use((req, res) => {
  res.status(404);
  res.send({
    error: {
      status: 404,
      message: "Ruta no encontrada",
    },
  });
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
