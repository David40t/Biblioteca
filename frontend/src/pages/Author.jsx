import { useParams } from "react-router-dom";
import { getAuthor, updateAuthor, createAuthor } from "../services/api.js";
import { useEffect, useState } from "react";

export default function Author() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");

  const isEdit = !!id; // true si hay id, false si no

  useEffect(() => {
    if (!isEdit) return;

    async function fetchAuthor() {
      const fetchedAuthor = await getAuthor(id);
      setName(fetchedAuthor.name);
      setLastName(fetchedAuthor.lastname);
    }

    fetchAuthor();
  }, [id]);

  function handleSubmit(e) {
    e.preventDefault();

    const author = { name, lastname : lastName };

    (async () => {
      try {
        if (isEdit) {
          await updateAuthor(author, id);
          alert("Autor actualizado con éxito");
        } else {
          await createAuthor(author);
          alert("Autor creado con éxito");
        }
        window.location.href = "/authors"; // redirige después de guardar
      } catch (error) {
        alert(error)
      }
    })();
  }

  return (
    <div>
      <h1>Autor</h1>
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
        <label className="form-label" for="last_name">
          Last Name
        </label>
        <input
          className="form-control"
          type="text"
          name="last_name"
          id="last_name"
          required
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <button className="btn btn-outline-success mt-3" type="submit">
          {isEdit ? "Actualizar" : "Crear"}
        </button>
      </form>
    </div>
  );
}
