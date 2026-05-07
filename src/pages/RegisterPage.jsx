import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Para poder redirigir al usuario desde JavaScript
import { registerUser } from "../services/auth.service"; // Importo la función que llama al backend para registrar usuarios
const RegisterPage = () => {

    const navigate = useNavigate(); // Creo función navigate

    const [formData, setFormData] = useState({ name: "", email: "", password: "", }); // Creo un estado para guardar los datos del formulario
    const [error, setError] = useState(""); // Mensjaes de error
    const [success, setSuccess] = useState(""); // Mensajes de éxito

    // Cada vez que el usuario escribe en un input
    const handleChange = (e) => {
        const { name, value } = e.target; // name -> que campo es | value -> que escribió el usuario
        // ...formData mantiene los valores anteriores. [name]: value actualiza solo el campo que cambió
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Se ejecuta al enviar el formulario y es async porque llamaremos al backend
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setError(""); // Limpiamos mensajes
            setSuccess("");

            const data = await registerUser(formData); // Llamamos al backend enviando { name, email, password}

            setSuccess(data.message); // Si el registro salió bien, guardas el mensaje de éxito que respondió el backend

            // Espera 1s y redirijo al usuario a /login
            setTimeout(() => {
                navigate("/login");
            }, 1000);

        } catch (error) { // email ya existe o faltan campos o backend apagado
            setError(error.response?.data?.message || "Error al registrar usuario"); // Primero intenta usar el mensaje del backend. Si no existe, usa uno genérico
        }
    };

    return (
        <main>
            <h1>Crear cuenta</h1>

            <form onSubmit={handleSubmit}>
                <div>
                    {/* htmlFor -> para conectar un <label> con un <input> */}
                    <label htmlFor="name">Nombre</label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Tu nombre"
                    />
                </div>

                <div>
                    <label htmlFor="email">Correo electrónico</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="tu@email.com"
                    />
                </div>

                <div>
                    <label htmlFor="password">Contraseña</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Mínimo 6 caracteres"
                    />
                </div>

                <button type="submit">Registrarme</button>
            </form>
            {success && <p>{success}</p>}{/*Si hay mensaje de éxito, lo muestra. Si success está vacío, no muestra nada */}
            {error && <p>{error}</p>}
        </main>
    );
};

export default RegisterPage; // Exportas para usar en App.js