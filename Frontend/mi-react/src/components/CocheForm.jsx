import { useState } from "react";

function CocheForm({ onCrear }) {
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [color, setColor] = useState("");
  const [anio, setAnio] = useState("");
  const [matricula, setMatricula] = useState("");
  const [combustible, setCombustible] = useState("");
  const [enviando, setEnviando] = useState(false);

  async function manejarSubmit(evento) {
    evento.preventDefault();
    setEnviando(true);

    const cocheDatos = {
      marca: marca.trim(),
      modelo: modelo.trim() || null,
      color: color.trim() || null,
      anio: anio ? Number(anio) : null,
      matricula: matricula.trim(),
      combustible: combustible.trim() || null
    };

    const creado = await onCrear(cocheDatos);
    setEnviando(false);

    if (creada) {
      setMarca("");
      setModelo("");
      setColor("");
      setAnio("");
      setMatricula("");
      setCombustible("");
    }
  }

  return (
    <form onSubmit={manejarSubmit} style={{ display: "grid", gap: "0.75rem", marginBottom: "2rem" }}>
      <h2>Añadir Nuevo Vehículo</h2>
      
      <label>
        Marca (*)
        <input value={marca} onChange={(e) => setMarca(e.target.value)} required minLength={2} />
      </label>

      <label>
        Matrícula (*)
        <input value={matricula} onChange={(e) => setMatricula(e.target.value)} required />
      </label>

      <label>
        Modelo
        <input value={modelo} onChange={(e) => setModelo(e.target.value)} />
      </label>

      <label>
        Color
        <input value={color} onChange={(e) => setColor(e.target.value)} />
      </label>

      <label>
        Año
        <input type="number" value={anio} onChange={(e) => setAnio(e.target.value)} />
      </label>

      <label>
        Combustible
        <input value={combustible} onChange={(e) => setCombustible(e.target.value)} placeholder="Ej: Gasolina, Diésel, Eléctrico" />
      </label>

      <button type="submit" disabled={enviando}>
        {enviando ? "Guardando..." : "Registrar Coche"}
      </button>
    </form>
  );
}

export default CocheForm;
