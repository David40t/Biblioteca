import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthors, deleteAuthor } from "../services/api.js";

export default function Authors() {
    const [authors, setAuthors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchAuthors();
    }, []);

    async function fetchAuthors() {
        try {
            const data = await getAuthors();
            setAuthors(data);
        } catch (err) {
            setError("Error al obtener autores.");
            console.error("Error al obtener autores:", err);
        } finally {
            setLoading(false);
        }
    }

    async function handleDelete(id) {
        if (!window.confirm("¿Estás seguro de que quieres eliminar este autor?")) return;

        try {
            await deleteAuthor(id);
            setAuthors(authors.filter((author) => author.id !== id));
            alert("Autor eliminado correctamente");
        } catch (error) {
            alert("Error al eliminar el autor.");
            console.error("Error al eliminar autor:", error);
        }
    }

    if (loading) return <p>Cargando autores...</p>;
    if (error) return <p className="text-danger">{error}</p>;

    return (
        <div>
            <h1>Autores</h1>
            <button className="btn btn-outline-secondary mb-3" onClick={() => navigate("/authors/create")}>
                Crear
            </button>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {authors.map((author, index) => (
                        <tr key={author.id}>
                            <td>{index + 1}</td>
                            <td>{author.name}</td>
                            <td>{author.lastname}</td>
                            <td>
                                <button
                                    className="btn btn-outline-primary me-2"
                                    onClick={() => navigate(`/authors/${author.id}`)}
                                >
                                    Editar
                                </button>
                                <button
                                    className="btn btn-outline-danger"
                                    onClick={() => handleDelete(author.id)}
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
