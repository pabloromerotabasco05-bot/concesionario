import express from "express";
import cochesRouter from "./routes/coches.routes.js";
import { logger } from "./middleware/logger.js";
import cors from "cors"

const app = express();
const PORT = 3000;

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
