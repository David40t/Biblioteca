import { useParams } from "react-router-dom";
import { getGender, updateGender, createGender } from "../services/api.js";
import { useEffect, useState } from "react";

export default function Gender() {
    const { id } = useParams();
    const [name, setName] = useState("");

    const isEdit = !!id; // true si hay id, false si no

    useEffect(() => {
        if (!isEdit) return;

        async function fetchGender() {
            const fetchedGender = await getGender(id);
            setName(fetchedGender.name);
        }

        fetchGender();
    }, [id]);

    function handleSubmit(e) {
        e.preventDefault();

        const gender = { name };

        (async () => {
            try {
                if (isEdit) {
                    await updateGender(gender, id);
                    alert("Género actualizado con éxito");
                } else {
                    await createGender(gender);
                    alert("Género creado con éxito");
                }
                window.location.href = "/genders"; // redirige después de guardar
            } catch (error) {
                alert(error)
            }
        })();
    }

    return (
        <div>
            <h1>Género</h1>
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
                <button className="btn btn-outline-success mt-3" type="submit">
                    {isEdit ? "Actualizar" : "Crear"}
                </button>
            </form>
        </div>
    );
}