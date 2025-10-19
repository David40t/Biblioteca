import { useParams, useNavigate } from "react-router-dom";
import { getGender, updateGender, createGender } from "../services/api.js";
import { useEffect, useState } from "react";

export default function Gender() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isEdit = !!id;

  useEffect(() => {
    if (!isEdit) {
      setLoading(false);
      return;
    }

    async function fetchGender() {
      try {
        const fetchedGender = await getGender(id);
        setName(fetchedGender.name);
      } catch (error) {
        console.error("Error al cargar el género:", error);
        setError("No se pudo cargar el género.");
      } finally {
        setLoading(false);
      }
    }

    fetchGender();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    const gender = { name };

    try {
      if (isEdit) {
        await updateGender(gender, id);
        alert("Género actualizado con éxito");
      } else {
        await createGender(gender);
        alert("Género creado con éxito");
      }
      navigate("/genders");
    } catch (error) {
      alert(error)
    }
  }

  if (loading) return <p>Cargando...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div>
      <h1>{isEdit ? "Editar Género" : "Crear Género"}</h1>
      <button className="btn btn-outline-secondary" onClick={() => navigate("/genders")}>
        Volver
      </button>
      <form className="form-control" onSubmit={handleSubmit}>
        <label className="form-label" htmlFor="name">
          Nombre
        </label>
        <input
          className="form-control"
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button className="btn btn-outline-success mt-3" type="submit">
          {isEdit ? "Actualizar" : "Crear"}
        </button>
      </form>
    </div>
  );
}
