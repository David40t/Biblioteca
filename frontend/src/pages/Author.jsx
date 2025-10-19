import { useParams, useNavigate } from "react-router-dom";
import { getAuthor, updateAuthor, createAuthor } from "../services/api.js";
import { useEffect, useState } from "react";

export default function Author() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const isEdit = !!id;

  useEffect(() => {
    if (!isEdit) return;

    const fetchAuthor = async () => {
      try {
        setLoading(true);
        const fetchedAuthor = await getAuthor(id);
        setName(fetchedAuthor.name || "");
        setLastName(fetchedAuthor.lastname || "");
      } catch (err) {
        setError("Error al cargar el autor.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthor();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    const author = { name, lastname: lastName };

    try {
      if (isEdit) {
        await updateAuthor(author, id);
        alert("Autor actualizado con éxito");
      } else {
        await createAuthor(author);
        alert("Autor creado con éxito");
      }
      navigate("/authors");
    } catch (error) {
      alert(error)
    }
  }

  if (loading) return <p>Cargando autor...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div>
      <h1>{isEdit ? "Editar Autor" : "Crear Autor"}</h1>
      <button className="btn btn-outline-secondary" onClick={() => navigate("/authors")}>
        Volver
      </button>
      <form className="form-control" onSubmit={handleSubmit}>
        <label className="form-label" htmlFor="name">
          Nombre
        </label>
        <input
          className="form-control"
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          id="name"
          required
        />
        <label className="form-label" htmlFor="last_name">
          Apellido
        </label>
        <input
          className="form-control"
          type="text"
          name="last_name"
          id="last_name"
          required
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <button className="btn btn-outline-success mt-3" type="submit">
          {isEdit ? "Actualizar" : "Crear"}
        </button>
      </form>
    </div>
  );
}
