import { getLoans, deleteLoan } from "../services/api.js";
import { useEffect, useState } from "react";

export default function Loans() {
    const [loans, setLoans] = useState([]);

    useEffect(() => {
        fetchLoans();
    }, []);

    async function fetchLoans() {
        try {
            const data = await getLoans();
            setLoans(data);
        } catch (error) {
            console.error("Error al obtener préstamos:", error);
        }
    }

    async function handleDelete(id) {
        if (!window.confirm("¿Estás seguro de que quieres eliminar este préstamo?"))
            return;
        try {
            await deleteLoan(id);
            setLoans(loans.filter((loan) => loan.id !== id));
        } catch (error) {
            console.error("Error al eliminar préstamo:", error);
        }
    }

    return (
        <div> 
            <h1>Préstamos</h1>
            <button className="btn btn-outline-secondary" onClick={() => window.location.href = `/loans/create`}>
                Crear    
            </button>
            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Título</th>
                        <th>usuario</th>
                        <th>Estado</th>
                        <th>Fecha de préstamo</th>
                        <th>Fecha de devolución</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {loans.map((loan, index) => (
                        <tr key={loan.id}>
                            <td>{index + 1}</td>
                            <td>{loan.book.title}</td>
                            <td>{loan.user.name }</td>
                            <td>{loan.status === 0 ? 'Prestado' : 'Devuelto'}</td>
                            <td>{loan.loan_date}</td>
                            <td>{loan.return_date}</td>
                            <td>
                                <button className="btn btn-outline-primary me-2"
                                    onClick={() => window.location.href = `/loans/${loan.id}`}
                                >Editar</button>
                                <button
                                    className="btn btn-outline-danger"
                                    onClick={() => handleDelete(loan.id)}>
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