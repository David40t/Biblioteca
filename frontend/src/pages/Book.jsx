import { useParams } from "react-router-dom";
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
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [genderId, setGenderId] = useState("");
  const [authors, setAuthors] = useState([]);
  const [genders, setGenders] = useState([]);

  const isEdit = !!id; // true si hay id, false si no

  useEffect(() => {
    async function fetchAuthors() {
      const data = await getAuthors();
      setAuthors(data);
    }

    async function fetchGenders() {
      const data = await getGenders();
      setGenders(data);
    }

    fetchAuthors();
    fetchGenders();
    if (!isEdit) return;

    async function fetchBook() {
      const fetchedBook = await getBook(id);
      setTitle(fetchedBook.title);
      setDescription(fetchedBook.description);
      setAuthorId(fetchedBook.author_id);
      setGenderId(fetchedBook.gender_id);
    }

    fetchBook();
  }, [id]);

  function handleSubmit(e) {
    e.preventDefault();

    const book = {
      title,
      description,
      author_id: authorId,
      gender_id: genderId,
    };

    (async () => {
      try {
        if (isEdit) {
          await updateBook(book, id);
          alert("Libro actualizado con éxito");
        } else {
          await createBook(book);
          alert("Libro creado con éxito");
        }
        window.location.href = "/books"; // redirige después de guardar
      } catch (error) {
        alert(error)
      }
    })();
  }

  return (
    <div>
      <h1>Book</h1>
      <form className="form-control" onSubmit={handleSubmit}>
        <label className="form-label" for="title">
          Title
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
        <label className="form-label" for="description">
          Description
        </label>
        <textarea
          className="form-control"
          name="description"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <label className="form-label" for="author_id">
          Author
        </label>
        <select
          className="form-control"
          name="author_id"
          id="author_id"
          value={authorId}
          onChange={(e) => setAuthorId(e.target.value)}
          required>
          <option value="">Selecciona un autor</option>
          {authors.map((author) => (
            <option key={author.id} value={author.id}>
              {author.name}
            </option>
          ))}
        </select>
        <label className="form-label" for="gender_id">
          Gender
        </label>
        <select
          className="form-control"
          name="gender_id"
          id="gender_id"
          value={genderId}
          onChange={(e) => setGenderId(e.target.value)}
          required>
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
