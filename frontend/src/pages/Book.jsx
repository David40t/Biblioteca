import { useParams, useNavigate } from "react-router-dom";
import {
  getBook,
  getAuthors,
  getGenders,
  updateBook,
  createBook,
} from "../services/api.js";
import { useEffect, useState } from "react";

export default function Book() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [genderId, setGenderId] = useState("");
  const [authors, setAuthors] = useState([]);
  const [genders, setGenders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isEdit = !!id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [authorsData, gendersData] = await Promise.all([
          getAuthors(),
          getGenders(),
        ]);

        setAuthors(authorsData);
        setGenders(gendersData);

        if (isEdit) {
          const fetchedBook = await getBook(id);
          setTitle(fetchedBook.title);
          setDescription(fetchedBook.description);
          setAuthorId(fetchedBook.author_id);
          setGenderId(fetchedBook.gender_id);
        }
      } catch (err) {
        console.error("Error al cargar datos del libro:", err);
        setError("No se pudieron cargar los datos.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();

    const book = {
      title,
      description,
      author_id: authorId,
      gender_id: genderId,
    };

    try {
      if (isEdit) {
        await updateBook(book, id);
        alert("Libro actualizado con éxito");
      } else {
        await createBook(book);
        alert("Libro creado con éxito");
      }
      navigate("/books");
    } catch (error) {
      alert(error)
    }
  }

  if (loading) return <p>Cargando libro...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div>
      <h1>{isEdit ? "Editar Libro" : "Crear Libro"}</h1>
      <button className="btn btn-outline-secondary" onClick={() => navigate("/books")}>
        Volver
      </button>
      <form className="form-control" onSubmit={handleSubmit}>
        <label className="form-label" htmlFor="title">
          Título
        </label>
        <input
          className="form-control"
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          id="title"
          required
        />

        <label className="form-label" htmlFor="description">
          Descripción
        </label>
        <textarea
          className="form-control"
          name="description"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <label className="form-label" htmlFor="author_id">
          Autor
        </label>
        <select
          className="form-control"
          name="author_id"
          id="author_id"
          value={authorId}
          onChange={(e) => setAuthorId(e.target.value)}
          required
        >
          <option value="">Selecciona un autor</option>
          {authors.map((author) => (
            <option key={author.id} value={author.id}>
              {author.name}
            </option>
          ))}
        </select>

        <label className="form-label" htmlFor="gender_id">
          Género
        </label>
        <select
          className="form-control"
          name="gender_id"
          id="gender_id"
          value={genderId}
          onChange={(e) => setGenderId(e.target.value)}
          required
        >
          <option value="">Selecciona un género</option>
          {genders.map((gender) => (
            <option key={gender.id} value={gender.id}>
              {gender.name}
            </option>
          ))}
        </select>

        <button className="btn btn-outline-success mt-3" type="submit">
          {isEdit ? "Actualizar" : "Crear"}
        </button>
      </form>
    </div>
  );
}
