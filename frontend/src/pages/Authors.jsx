import { getAuthors, deleteAuthor } from "../services/api.js";
import { useEffect, useState } from "react";

export default function Authors(){
    const [authors, setAuthors] = useState([]);

    useEffect(() => {
        fetchAuthors();
    }, []);

    async function fetchAuthors() {
        try {
            const data = await getAuthors();
            setAuthors(data);
        } catch (error) {
            console.error("Error al obtener autores:", error);
        }
    }

    async function handleDelete(id) {
        if (!window.confirm("¿Estás seguro de que quieres eliminar este autor?"))
            return;
        try {
            await deleteAuthor(id);
            setAuthors(authors.filter((author) => author.id !== id));
        } catch (error) {
            console.error("Error al eliminar autor:", error);
        }
    }

    return (
        <div>
            <h1>Autores</h1>
            <button className="btn btn-outline-secondary" onClick={() => window.location.href = `/authors/create`}>
                Crear
            </button>
            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {authors.map((author, index) => (
                        <tr key={author.id}>
                            <td>{index + 1}</td>
                            <td>{author.name}</td>
                            <td>{author.lastname}</td>
                            <td>
                                <button className="btn btn-outline-primary me-2"
                                    onClick={() => window.location.href = `/authors/${author.id}`}
                                >Editar</button>
                                <button
                                    className="btn btn-outline-danger"
                                    onClick={() => handleDelete(author.id)}>
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