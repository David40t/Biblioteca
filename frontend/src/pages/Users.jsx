import { getUsers, deleteUser } from "../services/api.js";
import { useEffect, useState } from "react";

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("¿Estás seguro de que quieres eliminar este usuario?"))
      return;
    try {
      await deleteUser(id);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
  }

  return (
    <div>
      <h1>Users</h1>
      <button className="btn btn-outline-secondary" onClick={() => window.location.href = `/users/create`}>
        Create
      </button>
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button className="btn btn-outline-primary me-2"
                    onClick={() => window.location.href = `/users/${user.id}`}
                >Editar</button>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => handleDelete(user.id)}>
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
