import prisma from "../lib/prisma.js"

// 1. LISTAR TODOS LOS COCHES
export async function listarCoche(req, res) {
  try {
    // Cambiado a 'coche' en minúscula para coincidir con tu esquema de Prisma
    const Coche = await prisma.coche.findMany({
      orderBy: { id: "asc" }
    });
    return res.json(Coche);
  } catch (error) {
    console.error("❌ ERROR REAL EN EL CONTROLADOR (LISTAR):", error);
    return res.status(500).json({ error: "No se pudieron obtener los coches" });
  }
}

// 2. OBTENER UN COCHE POR ID
export async function obtenerCoche(req, res) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
      return res.status(400).json({ error: "El id debe ser un numero entero" });
    }

    const coche = await prisma.Coche.findUnique({
      where: { id }
    });

    if (!coche) {
      return res.status(404).json({ error: "Coche no encontrado" });
    }

    return res.json(coche);
  } catch (error) {
    console.error("❌ ERROR REAL EN EL CONTROLADOR (OBTENER):", error);
    return res.status(500).json({ error: "No se pudo obtener el coche" });
  }
}

// 3. CREAR UN NUEVO COCHE
export async function crearCoche(req, res) {
  try {
    const { marca, modelo, color, anio, matricula, combustible } = req.body;

    if (!marca || typeof marca !== "string" || marca.trim() === "") {
      return res.status(400).json({ error: "La marca es obligatoria y debe ser un texto" });
    }

    if (!matricula || typeof matricula !== "string" || matricula.trim() === "") {
      return res.status(400).json({ error: "La matrícula es obligatoria" });
    }


    const coche = await prisma.Coche.create({
      data: {
        marca: marca.trim(),
        modelo: modelo?.trim() || null,
        color: color?.trim() || null,
        anio: anio != null ? String(anio).trim() : null,
        matricula: matricula.trim(), 
        combustible: combustible?.trim() || null
      }
    });

    return res.status(201).json(coche);
  } catch (error) {
    console.error("❌ ERROR REAL EN EL CONTROLADOR (CREAR):", error);
    return res.status(500).json({ error: "No se pudo crear el coche" });
  }
}

// 4. ACTUALIZAR UN COCHE
export async function actualizarCoche(req, res) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
      return res.status(400).json({ error: "El id debe ser un numero entero" });
    }

    const existente = await prisma.Coche.findUnique({
      where: { id }
    });

    if (!existente) {
      return res.status(404).json({ error: "Coche no encontrado" });
    }

    const { marca, modelo, color, matricula, combustible } = req.body;
    const datos = {};

    if (marca !== undefined) {
      if (typeof marca !== "string" || marca.trim().length < 2) {
        return res.status(400).json({
          error: "La marca debe tener al menos 2 caracteres"
        });
      }
      datos.marca = marca.trim();
    }

    if (modelo !== undefined) {
      datos.modelo = typeof modelo === "string" && modelo.trim() ? modelo.trim() : null;
    }

    if (color !== undefined) {
      datos.color = typeof color === "string" && color.trim() ? color.trim() : null;
    }
    if (combustible !== undefined) {
      datos.combustible = typeof combustible === "string" && combustible.trim() ? combustible.trim() : null;
    }

    if (matricula !== undefined) {
      if (typeof matricula !== "string" || matricula.trim() === "") {
        return res.status(400).json({
          error: "La matrícula no puede ser un campo vacío"
        });
      }
      datos.matricula = matricula.trim();
    }

    const coche = await prisma.Coche.update({
      where: { id },
      data: datos
    });

    return res.json(coche);
  } catch (error) {
    console.error("❌ ERROR REAL EN EL CONTROLADOR (ACTUALIZAR):", error);
    return res.status(500).json({ error: "No se pudo actualizar el coche" });
  }
}

// 5. ELIMINAR UN COCHE
export async function eliminarCoche(req, res) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
      return res.status(400).json({ error: "El id debe ser un numero entero" });
    }

    const existente = await prisma.Coche.findUnique({
      where: { id }
    });

    if (!existente) {
      return res.status(404).json({ error: "Coche no encontrado" });
    }

    await prisma.Coche.delete({
      where: { id }
    });

    return res.status(204).send();
  } catch (error) {
    console.error("❌ ERROR REAL EN EL CONTROLADOR (ELIMINAR):", error);
    return res.status(500).json({ error: "No se pudo eliminar el coche" });
  }
}
