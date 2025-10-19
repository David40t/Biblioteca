import { getLoans } from "../services/api.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Loans() {
    const [loans, setLoans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLoans = async () => {
            try {
                const data = await getLoans();
                setLoans(data);
            } catch (err) {
                console.error("Error al obtener préstamos:", err);
                setError("No se pudieron cargar los préstamos.");
            } finally {
                setLoading(false);
            }
        };

        fetchLoans();
    }, []);

    if (loading) return <p>Cargando préstamos...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Préstamos</h1>
            <button className="btn btn-outline-secondary" onClick={() => navigate('/loans/create')}>
                Crear    
            </button>
            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Título</th>
                        <th>Usuario</th>
                        <th>Estado</th>
                        <th>Fecha de préstamo</th>
                        <th>Fecha de devolución</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {loans.map((loan, index) => (
                        <tr key={loan.id || index}>
                            <td>{index + 1}</td>
                            <td>{loan.book?.title || 'Sin título'}</td>
                            <td>{loan.user?.name || 'Sin usuario'}</td>
                            <td>{loan.status === 0 ? 'Prestado' : 'Devuelto'}</td>
                            <td>{loan.loan_date}</td>
                            <td>{loan.return_date}</td>
                            <td>
                                <button className="btn btn-outline-primary me-2"
                                    onClick={() => navigate(`/loans/${loan.id}`)}
                                >Editar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
