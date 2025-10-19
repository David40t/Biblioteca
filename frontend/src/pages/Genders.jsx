import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getGenders, deleteGender } from "../services/api.js";

export default function Genders() {
  const [genders, setGenders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchGenders();
  }, []);

  async function fetchGenders() {
    try {
      const data = await getGenders();
      setGenders(data);
    } catch (error) {
      console.error("Error al obtener géneros:", error);
      setError("No se pudieron cargar los géneros.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar este género?");
    if (!confirmDelete) return;

    try {
      await deleteGender(id);
      setGenders((prev) => prev.filter((gender) => gender.id !== id));
      alert("Género eliminado con éxito.");
    } catch (error) {
      console.error("Error al eliminar género:", error);
      alert("No se pudo eliminar el género.");
    }
  }

  if (loading) return <p>Cargando géneros...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div>
      <h1>Géneros</h1>
      <button
        className="btn btn-outline-secondary mb-3"
        onClick={() => navigate("/genders/create")}
      >
        Crear
      </button>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {genders.map((gender, index) => (
            <tr key={gender.id}>
              <td>{index + 1}</td>
              <td>{gender.name}</td>
              <td>
                <button
                  className="btn btn-outline-primary me-2"
                  onClick={() => navigate(`/genders/${gender.id}`)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => handleDelete(gender.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
