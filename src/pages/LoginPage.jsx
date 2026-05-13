import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Para poder redirigir al usuario desde JavaScript
import { loginUser } from "../services/auth.service"; // // Importo la función que llama al backend para registrar usuarios
import { useAuth } from "../context/useAuth"; // Importas el hook de autenticación para acceder al contexto global

import "./Auth.css";
const LoginPage = () => {

    const navigate = useNavigate(); // Creo función navigate
    const { login } = useAuth(); // Sacas la función login del contexto global. Esa función viene de tu AuthProvider

    const [formData, setFormData] = useState({ email: "", password: "", }); // Creo estado formulario
    const [error, setError] = useState("");

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
            setError(""); // Limpiamos mensaje error

            const data = await loginUser(formData); // Llama al backend enviando {email, password}

            login({ user: data.user, token: data.token, }); // Guarda el usuario y el token en el contexto global. También guarda el token en localStorage, porque tu función login del AuthProvider hace eso

            navigate("/profile"); // Redirige al usuario a la página de perfil después del login correcto

        } catch (error) { //Si falla el email incorrecto o contraseña incorrecta o backend apagado

            setError(error.response?.data?.message || "Error al iniciar sesión"); // Primero intenta usar el mensaje del backend. Si no existe, usa uno genérico
        }
    };

    return (
        <main className="auth-page">
            <section className="auth-card">
                <h1>Iniciar sesión</h1>

                <form className="auth-form" onSubmit={handleSubmit}>
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
                            placeholder="Tu contraseña"
                        />
                    </div>

                    <button type="submit">Entrar</button>
                </form>

                {error && <p className="auth-error">{error}</p>}
            </section>
        </main>
    );
};

export default LoginPage; // Exportar para usar en App.jsx