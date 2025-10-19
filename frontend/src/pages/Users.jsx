import { getUsers, deleteUser } from "../services/api.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      setError("No se pudieron cargar los usuarios.");
    }finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("¿Estás seguro de que quieres eliminar este usuario?")) return;

    try {
      await deleteUser(id);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
        alert(error)
    }
  }

  if (loading) return <p>Cargando usuarios...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div>
      <h1>Usuarios</h1>

      <button
        className="btn btn-outline-secondary"
        onClick={() => navigate("/users/create")}
      >
        Crear
      </button>

      {error && <p className="text-danger mt-2">{error}</p>}

      <table className="table mt-3">
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    className="btn btn-outline-primary me-2"
                    onClick={() => navigate(`/users/${user.id}`)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => handleDelete(user.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}
