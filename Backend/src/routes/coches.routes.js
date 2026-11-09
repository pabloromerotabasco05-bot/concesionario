import { Router } from "express";
import {
  listarCoche,
  obtenerCoche,
  crearCoche,
  actualizarCoche,
  eliminarCoche
} from "../controllers/coches.controller.js";
import { validarCoche } from "../middleware/validarCoche.js";
import { comprobarApiKey } from "../middleware/apiKey.js";

const router = Router();

router.get("/", listarCoche);
router.get("/:id", obtenerCoche);

router.post("/", comprobarApiKey, validarCoche, crearCoche);
router.patch("/:id", comprobarApiKey, actualizarCoche);
router.delete("/:id", comprobarApiKey, eliminarCoche);

export default router;
