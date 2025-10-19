import { getGenders, deleteGender } from "../services/api.js";
import { useEffect, useState } from "react";

export default function Genders(){
    const [genders, setGenders] = useState([]);

    useEffect(() => {
        fetchGenders();
    }, []);

    async function fetchGenders() {
        try {
            const data = await getGenders();
            setGenders(data);
        } catch (error) {
            console.error("Error al obtener géneros:", error);
        }
    }

    async function handleDelete(id) {
        if (!window.confirm("¿Estás seguro de que quieres eliminar este género?"))
            return;
        try {
            await deleteGender(id);
            setGenders(genders.filter((gender) => gender.id !== id));
        } catch (error) {
            console.error("Error al eliminar género:", error);
        }
    }

    return (
        <div> 
            <h1>Géneros</h1>
            <button className="btn btn-outline-secondary" onClick={() => window.location.href = `/genders/create`}>
                Crear
            </button>
            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {genders.map((gender, index) => (
                        <tr key={gender.id}>
                            <td>{index + 1}</td>
                            <td>{gender.name}</td>
                            <td>
                                <button className="btn btn-outline-primary me-2"
                                    onClick={() => window.location.href = `/genders/${gender.id}`}
                                >Editar</button>
                                <button
                                    className="btn btn-outline-danger"
                                    onClick={() => handleDelete(gender.id)}>
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