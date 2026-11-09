function CocheItem({ coche, onModificarCombustible, onEliminar }) {
  return (
    <article style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem", borderRadius: "4px", background: "#fff" }}>
      <h3>{coche.marca} {coche.modelo}</h3>
      <p><strong>Matrícula:</strong> {coche.matricula}</p>
      <p><strong>Color:</strong> {coche.color || "No especificado"}</p>
      <p><strong>Año:</strong> {coche.anio || "No especificado"}</p>
      <p><strong>Combustible:</strong> {coche.combustible || "No especificado"}</p>
      
      <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
        <button onClick={() => onModificarCombustible(coche)}>
          Cambiar Combustible
        </button>
        <button onClick={() => onEliminar(coche.id)} style={{ backgroundColor: "#ff4d4d", color: "white", border: "none", padding: "0.4rem 0.8rem", borderRadius: "4px", cursor: "pointer" }}>
          Eliminar
        </button>
      </div>
    </article>
  );
}

export default CocheItem;
