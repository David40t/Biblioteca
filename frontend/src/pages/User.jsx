import { useParams } from "react-router-dom";
import { getUser, updateUser, createUser } from "../services/api.js";
import { useEffect, useState } from "react";

export default function User() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const isEdit = !!id; // true si hay id, false si no


  useEffect(() => {
  if (!isEdit) return;

  async function fetchUser() {
    const fetchedUser = await getUser(id);
    setName(fetchedUser.name);
    setEmail(fetchedUser.email);
  }

  fetchUser();
}, [id]);


  function handleSubmit(e) {
  e.preventDefault();

  const user = { name, email, password };

  if (password !== confirmPassword) {
    alert("Las contraseñas no coinciden");
    return;
  }

  (async () => {
    try {
      if (isEdit) {
        await updateUser(user, id);
        alert("Usuario actualizado con éxito");
      } else {
        await createUser(user);
        alert("Usuario creado con éxito");
      }

      window.location.href = "/users"; // redirige después de guardar
    } catch (error) {
      alert(error)
    }
  })();
}

  return (
    <div>
      <h1>User</h1>
      <form className="form-control" onSubmit={handleSubmit}>
        <label className="form-label" for="name">
          Name
        </label>
        <input
          className="form-control"
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          id="name"
          required
        />
        <label className="form-label" for="email">
          Email
        </label>
        <input
          className="form-control"
          type="text"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label className="form-label" for="password">
          Password
        </label>
        <input
          className="form-control"
          type="password"
          name="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          minLength="8"
          maxLength="100"
          pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,100}$"
          title="La contraseña debe contener al menos 8 caracteres, una letra y un número"
          required= {isEdit ? "" : "required"}
        />
        <label className="form-label" for="password">
          Confirm Password
        </label>
        <input
          className="form-control"
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          onChange={(e) => setConfirmPassword(e.target.value)}
          required= {isEdit ? "" : "required"}
        />
        <button className="btn btn-outline-success mt-3" type="submit">
  {isEdit ? "Actualizar" : "Crear"}
</button>
      </form>
    </div>
  );
}
