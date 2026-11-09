export function validarCoche(req, res, next) {
  const { marca } = req.body;

  if (typeof marca !== "string" || marca.trim().length < 2) {
    return res.status(400).json({
      error: "El marca es obligatoria y debe tener al menos 2 caracteres"
    });
  }

  next();
}
