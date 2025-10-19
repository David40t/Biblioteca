import { useParams } from "react-router-dom";
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
    const [bookId, setBookId] = useState("");
    const [userId, setUserId] = useState("");
    const [book, setBook] = useState({});
    const [books, setBooks] = useState([]);
    const [users, setUsers] = useState([]);
    const [status, setStatus] = useState("");
    const [loanDate, setLoanDate] = useState("");
    const [returnDate, setReturnDate] = useState("");

    const isEdit = !!id; // true si hay id, false si no

    useEffect(() => {
        async function fetchBooks() {
            const data = await getBooks();
            setBooks(data);
        }

        async function fetchUsers() {
            const data = await getUsers();
            setUsers(data);
        }

        fetchBooks();
        fetchUsers();
        if (!isEdit) return;

        async function fetchLoan() {
            const fetchedLoan = await getLoan(id);
            setBookId(fetchedLoan.book_id);
            setUserId(fetchedLoan.user_id);
            setStatus(fetchedLoan.status);
            setLoanDate(fetchedLoan.loan_date);
            setReturnDate(fetchedLoan.return_date);
        }

        fetchLoan();
    }, [id]);

    function handleSubmit(e) {
        e.preventDefault();

        const loan = {
            book_id: bookId,
            user_id: userId,
            status: status,
            loan_date: loanDate,
            return_date: returnDate,
        };

        (async () => {
            try {
                if (isEdit) {
                    await updateLoan(loan, id);
                    alert("Préstamo actualizado con éxito");
                } else {
                    await createLoan(loan);
                    alert("Préstamo creado con éxito");
                }
                window.location.href = "/loans"; // redirige después de guardar
            } catch (error) {
                alert(error)
            }
        })();
    }

    return (
        <div> 
            <h1>Préstamo</h1>
            <form className="form-control" onSubmit={handleSubmit}>
                <label className="form-label" for="book_id">
                    Book
                </label>
                <select
                    className="form-control"
                    name="book_id"
                    id="book_id"
                    value={bookId}
                    onChange={(e) => setBookId(e.target.value)}
                    required>
                    <option value="">Selecciona un libro</option>
                    {books.map((book) => (
                        <option key={book.id} value={book.id}>
                            {book.title}
                        </option>
                    ))}
                </select>
                <label className="form-label" for="user_id">
                    User
                </label>
                <select
                    className="form-control"
                    name="user_id"
                    id="user_id"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    required>
                    <option value="">Selecciona un usuario</option>
                    {users.map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.name}
                        </option>
                    ))}
                </select>
                <label className="form-label" for="status">
                    Status
                </label>
                <select className="form-control" name="status" id="status" value={status} onChange={(e) => setStatus(e.target.value)} required>
                    <option value="">Selecciona un estado</option>
                    <option value="0">Prestado</option>
                    <option value="1">Devuelto</option>
                </select>
                <label className="form-label" for="loan_date">
                    Loan Date
                </label>
                <input
                    className="form-control"
                    type="date"
                    name="loan_date"
                    id="loan_date"
                    value={loanDate}
                    onChange={(e) => setLoanDate(e.target.value)}
                    required
                />
                <label className="form-label" for="return_date">
                    Return Date
                </label>
                <input
                    className="form-control"
                    type="date"
                    name="return_date"
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