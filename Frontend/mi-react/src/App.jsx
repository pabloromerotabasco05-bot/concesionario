import { useCallback, useEffect, useState } from "react";
import { obtenerCoches, crearCoche, modificarCoche, eliminarCoche } from "./services/cochesApi";
import CocheItem from "./components/CocheItem";
import CocheForm from "./components/CocheForm";

function App() {
  const [coches, setCoches] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [errorCarga, setErrorCarga] = useState("");
  const [aviso, setAviso] = useState(null);
  const [apiKey, setApiKey] = useState(
    () => sessionStorage.getItem("apiKey") ?? ""
  );

  const cargarCoches = useCallback(async () => {
    try {
      setErrorCarga("");
      setCoches(await obtenerCoches());
    } catch (err) {
      setErrorCarga(err.message);
    }
  }, []);

  useEffect(() => {
    cargarCoches().finally(() => setCargando(false));
  }, [cargarCoches]);

  function reintentar() {
    setCargando(true);
    cargarCoches().finally(() => setCargando(false));
  }

  function mostrarAviso(tipo, texto) {
    setAviso({ tipo, texto });
  }

  function guardarApiKey() {
    sessionStorage.setItem("apiKey", apiKey);
    mostrarAviso("ok", "Clave API guardada en la sesión de trabajo");
  }

  async function manejarCrear(datos) {
    try {
      const nuevo = await crearCoche(datos);
      setCoches((actuales) => [...actuales, nuevo]);
      mostrarAviso("ok", "Vehículo registrado correctamente");
      return true;
    } catch (err) {
      mostrarAviso("error", err.message);
      return false;
    }
  }

  async function manejarModificarCombustible(coche) {
    const nuevoCombustible = window.prompt("Introduce el nuevo tipo de combustible:", coche.combustible || "");
    if (nuevoCombustible === null) return;

    const cambios = { combustible: nuevoCombustible.trim() || null };
    
    try {
      setErrorCarga("");
      await modificarCoche(coche.id, cambios);
      
      setCoches((actuales) =>
        actuales.map((c) => {
          if (c.id === coche.id) {
            return { ...c, ...cambios };
          }
          return c;
        })
      );
      
      mostrarAviso("ok", "Combustible actualizado correctamente en pantalla y Base de Datos");
      
    } catch (err) {
      mostrarAviso("error", `Error al actualizar: ${err.message}`);
    }
  }


  async function manejarEliminar(id) {
    if (!window.confirm("¿Seguro que deseas eliminar este vehículo del sistema?")) return;
    try {
      await eliminarCoche(id);
      setCoches((actuales) => actuales.filter((c) => c.id !== id));
      mostrarAviso("ok", "Vehículo eliminado correctamente");
    } catch (err) {
      mostrarAviso("error", err.message);
    }
  }

  return (
    <main style={{ maxWidth: "800px", margin: "auto", padding: "2rem" }}>
      <h1>Gestión del Concesionario</h1>

      
      <section >
        <h2>Acceso a operaciones protegidas</h2>
        <input
          type="text"
          value={apiKey}
          placeholder="Introduce la API Key"
          onChange={(e) => setApiKey(e.target.value)}
          style={{ marginRight: "0.5rem", padding: "0.4rem" }}
        />
        <button onClick={guardarApiKey}>Guardar en Sesión</button>
      </section>

      {/* Alertas y avisos de acciones */}
      {aviso && (
        <p 
          style={{ 
            padding: "0.75rem 1rem", 
            borderRadius: "4px", 
            backgroundColor: aviso.tipo === "ok" ? "#e3f4e7" : "#fde7e7",
            color: aviso.tipo === "ok" ? "#1e4620" : "#611a1a"
          }} 
          role="status"
        >
          {aviso.texto}
        </p>
      )}

      {/* Formulario de Registro */}
      <CocheForm onCrear={manejarCrear} />

      {/* Listado de Vehículos */}
      <h2>Flota de Vehículos ({coches.length})</h2>
      
      {cargando && <p>Cargando flota...</p>}
      
      {!cargando && errorCarga && (
        <div role="alert">
          <p style={{ color: "red" }}>{errorCarga}</p>
          <button onClick={reintentar}>Reintentar conexión</button>
        </div>
      )}
      
      {!cargando && !errorCarga && coches.length === 0 && <p>No hay vehículos registrados en el concesionario.</p>}
      
      {!cargando && !errorCarga && coches.map((coche) => (
        <CocheItem 
          key={coche.id} 
          coche={coche} 
          onModificarCombustible={manejarModificarCombustible} 
          onEliminar={manejarEliminar} 
        />
      ))}
    </main>
  );
}

export default App;
