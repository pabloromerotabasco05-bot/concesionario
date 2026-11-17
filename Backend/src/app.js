import express from "express";
import cochesRouter from "./routes/coches.routes.js";
import { logger } from "./middleware/logger.js";
import cors from "cors"

const app = express();



const origenes = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL.split(",").map((o) => o.trim())
  : ["http://localhost:5173", "http://localhost:4173"];
 
app.use(cors({ origin: origenes }));   // antes del middleware de x-api-key
app.use(express.json());
 
app.get("/", (req, res) => res.json({ estado: "ok" }));   // ruta de salud
 
// ... rutas y manejador de errores global
 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));

app.use(cors({ origin: ["http://localhost:5173", "http://localhost:4173"] }));
app.use(express.json());

app.use(express.json());
app.use(logger);

app.get("/", (req, res) => {
  res.json({
    nombre: "API de coches",
    estado: "funcionando"
  });
});

app.use("/api/concesionario", cochesRouter);

app.use((req, res) => {
  res.status(404).json({
    error: "Ruta no encontrada"
  });
});

app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
