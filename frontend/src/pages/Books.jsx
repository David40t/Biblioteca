import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBooks, deleteBook } from "../services/api.js";

export default function Books() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks();
  }, []);

  async function fetchBooks() {
    try {
      const data = await getBooks();
      setBooks(data);
    } catch (error) {
      console.error("Error al obtener libros:", error);
      setError("No se pudieron cargar los libros.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar este libro?");
    if (!confirmDelete) return;

    try {
      await deleteBook(id);
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
      alert("Libro eliminado con éxito.");
    } catch (error) {
      alert(error)
    }
  }

  if (loading) return <p>Cargando libros...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div>
      <h1>Libros</h1>
      <button
        className="btn btn-outline-secondary mb-3"
        onClick={() => navigate("/books/create")}
      >
        Crear
      </button>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Título</th>
            <th>Autor</th>
            <th>Género</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr key={book.id}>
              <td>{index + 1}</td>
              <td>{book.title}</td>
              <td>{book.author.name} {book.author.lastname}</td>
              <td>{book.gender.name}</td>
              <td>
                <button
                  className="btn btn-outline-primary me-2"
                  onClick={() => navigate(`/books/${book.id}`)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => handleDelete(book.id)}
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
