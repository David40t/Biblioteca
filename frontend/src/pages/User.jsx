import { useParams, useNavigate } from "react-router-dom";
import { getUser, updateUser, createUser } from "../services/api.js";
import { useEffect, useState } from "react";

export default function User() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isEdit = !!id;

  useEffect(() => {
    if (!isEdit) {
      setLoading(false);
      return;
    }

    async function fetchUser() {
      try {
        const fetchedUser = await getUser(id);
        setName(fetchedUser.name);
        setEmail(fetchedUser.email);
      } catch (err) {
        console.error("Error al obtener usuario:", err);
        setError("No se pudo cargar el usuario");
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!isEdit && password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    const user = {
      name,
      email,
      ...(password && { password }), // Solo enviar si está presente
    };

    try {
      if (isEdit) {
        await updateUser(user, id);
        alert("Usuario actualizado con éxito");
      } else {
        await createUser(user);
        alert("Usuario creado con éxito");
      }

      navigate("/users");
    } catch (err) {
      alert(err)
    }
  }

  if (loading) return <p>Cargando usuario...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div>
      <h1>{isEdit ? "Editar Usuario" : "Crear Usuario"}</h1>
      <button className="btn btn-outline-secondary" onClick={() => navigate("/users")}>
        Volver
      </button>
      <form className="form-control" onSubmit={handleSubmit}>
        <label className="form-label" htmlFor="name">
          Nombre
        </label>
        <input
          className="form-control"
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label className="form-label" htmlFor="email">
          Correo electrónico
        </label>
        <input
          className="form-control"
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="form-label" htmlFor="password">
          Contraseña {isEdit && "(opcional)"}
        </label>
        <input
          className="form-control"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength="8"
        />

        <label className="form-label" htmlFor="confirmPassword">
          Confirmar contraseña {isEdit && "(opcional)"}
        </label>
        <input
          className="form-control"
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          minLength="8"
        />

        <button className="btn btn-outline-success mt-3" type="submit">
          {isEdit ? "Actualizar" : "Crear"}
        </button>
      </form>
    </div>
  );
}
