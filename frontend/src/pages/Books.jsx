import { getBooks, deleteBook } from "../services/api.js";
import { useEffect, useState } from "react";

export default function Books() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetchBooks();
    }, []);

    async function fetchBooks() {
        try {
            const data = await getBooks();
            setBooks(data);
        } catch (error) {
            console.error("Error al obtener libros:", error);
        }
    }

    async function handleDelete(id) {
        if (!window.confirm("¿Estás seguro de que quieres eliminar este libro?"))
            return;
        try {
            await deleteBook(id);
            setBooks(books.filter((book) => book.id !== id));
        } catch (error) {
            console.error("Error al eliminar libro:", error);
        }
    }

    return (
        <div>
            <h1>Books</h1>
            <button className="btn btn-outline-secondary" onClick={() => window.location.href = `/books/create`}>
                Crear
            </button>
            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Título</th>
                        <th>Autor</th>
                        <th>Género</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book, index) => (
                        <tr key={book.id}>
                            <td>{index + 1}</td>
                            <td>{book.title}</td>
                            <td>{book.author.name + ' ' + book.author.lastname}</td>
                            <td>{book.gender.name}</td>
                            <td>
                                <button className="btn btn-outline-primary me-2"
                                    onClick={() => window.location.href = `/books/${book.id}`}
                                >Editar</button>
                                <button
                                    className="btn btn-outline-danger"
                                    onClick={() => handleDelete(book.id)}>
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