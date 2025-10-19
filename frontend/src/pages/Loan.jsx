import { useParams, useNavigate } from "react-router-dom";
import {
  getLoan,
  getBooks,
  getUsers,
  updateLoan,
  createLoan,
} from "../services/api.js";
import { useEffect, useState } from "react";

export default function Loan() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [bookId, setBookId] = useState("");
  const [userId, setUserId] = useState("");
  const [status, setStatus] = useState("");
  const [loanDate, setLoanDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isEdit = !!id;

  useEffect(() => {
    async function fetchData() {
      try {
        const [booksData, usersData] = await Promise.all([
          getBooks(),
          getUsers(),
        ]);
        setBooks(booksData);
        setUsers(usersData);

        if (isEdit) {
          const fetchedLoan = await getLoan(id);
          setBookId(fetchedLoan.book_id);
          setUserId(fetchedLoan.user_id);
          setStatus(fetchedLoan.status.toString());
          setLoanDate(fetchedLoan.loan_date);
          setReturnDate(fetchedLoan.return_date);
        }
      } catch (err) {
        console.error("Error al cargar datos del préstamo:", err);
        setError("No se pudieron cargar los datos.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();

    const loan = {
      book_id: parseInt(bookId),
      user_id: parseInt(userId),
      status: parseInt(status),
      loan_date: loanDate,
      return_date: returnDate,
    };

    try {
      if (isEdit) {
        await updateLoan(loan, id);
        alert("Préstamo actualizado con éxito");
      } else {
        await createLoan(loan);
        alert("Préstamo creado con éxito");
      }
      navigate("/loans");
    } catch (err) {
      alert(err)
    }
  }

  if (loading) return <p>Cargando préstamo...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div>
      <h1>{isEdit ? "Editar Préstamo" : "Crear Préstamo"}</h1>
      <button className="btn btn-outline-secondary" onClick={() => navigate("/loans")}>
        Volver
      </button>
      <form className="form-control" onSubmit={handleSubmit}>
        <label className="form-label" htmlFor="book_id">
          Libro
        </label>
        <select
          className="form-control"
          id="book_id"
          value={bookId}
          onChange={(e) => setBookId(e.target.value)}
          required
        >
          <option value="">Selecciona un libro</option>
          {books.map((book) => (
            <option key={book.id} value={book.id}>
              {book.title}
            </option>
          ))}
        </select>

        <label className="form-label" htmlFor="user_id">
          Usuario
        </label>
        <select
          className="form-control"
          id="user_id"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        >
          <option value="">Selecciona un usuario</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        <label className="form-label" htmlFor="status">
          Estado
        </label>
        <select
          className="form-control"
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        >
          <option value="">Selecciona un estado</option>
          <option value="0">Prestado</option>
          <option value="1">Devuelto</option>
        </select>

        <label className="form-label" htmlFor="loan_date">
          Fecha de préstamo
        </label>
        <input
          className="form-control"
          type="date"
          id="loan_date"
          value={loanDate}
          onChange={(e) => setLoanDate(e.target.value)}
          required
        />

        <label className="form-label" htmlFor="return_date">
          Fecha de devolución
        </label>
        <input
          className="form-control"
          type="date"
          id="return_date"
          value={returnDate}
          onChange={(e) => setReturnDate(e.target.value)}
          required
        />

        <button className="btn btn-outline-success mt-3" type="submit">
          {isEdit ? "Actualizar" : "Crear"}
        </button>
      </form>
    </div>
  );
}
