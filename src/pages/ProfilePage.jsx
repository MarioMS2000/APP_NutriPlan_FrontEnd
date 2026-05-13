import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Para poder redirigir al usuario desde JavaScript
import { useAuth } from "../context/useAuth"; // Importas el hook de autenticación para acceder al contexto global
import { createNutritionProfile, getMyNutritionProfile, updateNutritionProfile } from "../services/nutritionProfile.service";

import "./ProfilePage.css";
const ProfilePage = () => {

    const navigate = useNavigate(); // Creo función navigate

    const { user, token, logout } = useAuth(); // Sacas la función login del contexto global. user → datos del usuario logueado, token y logout → función para cerrar sesión

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const [profile, setProfile] = useState(null);
    const [formData, setFormData] = useState({
        age: "",
        height: "",
        weight: "",
        goal: "maintain_weight",
        activityLevel: "medium",
        dietType: "standard",
        allergies: "",
    });

    const loadProfile = async () => {
        try {
            const data = await getMyNutritionProfile(token);

            // Si existe el perfil. data.profile.age || "" -> usa data.profile.age si existe y si no, usa string vacío. Se hace para evitar que el valor sea undefined o null 
            if (data.profile) {
                setProfile(data.profile);
                setFormData({
                    age: data.profile.age || "",
                    height: data.profile.height || "",
                    weight: data.profile.weight || "",
                    goal: data.profile.goal || "maintain_weight",
                    activityLevel: data.profile.activityLevel || "medium",
                    dietType: data.profile.dietType || "standard",
                    allergies: data.profile.allergies || "",
                });
            }
        } catch (error) {
            setError("Error al cargar el perfil nutricional");
        }
    };

    useEffect(() => {
        if (token) {
            loadProfile();
        }
    }, [token]);

    // Cada vez que el usuario escribe en un input
    const handleChange = (e) => {
        const { name, value } = e.target; // name -> que campo es | value -> que escribió el usuario

        // ...formData mantiene los valores anteriores. [name]: value actualiza solo el campo que cambió
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setMessage("");
            setError("");

            let data;

            // Si exite perfil lo actualiza, y como la primera vez sera null lo crea
            if (profile) {
                data = await updateNutritionProfile(formData, token);
            } else {
                data = await createNutritionProfile(formData, token);
            }

            setProfile(data.profile); // Guarda perfil en el estado
            setMessage(data.message);
        } catch (error) {
            setError(error.response?.data?.message || "Error al guardar el perfil");
        }
    };

    // Se ejecutará cuando pulse el botón de cerrar sesión
    const handleLogout = () => {

        // Cierra sesión
        logout(); // Hace esto -> setUser(null), setToken(null), borra el token del localStorage

        navigate("/login"); // Redirige al usuario a /login

    };

    return (
        <main className="profile-page">
            <section className="profile-card">
                <h1>Perfil</h1>
                
                {/* user && -> si existe user, muestra lo de dentro. Si es null no muestres su contenido */}
                {user && (
                    <section className="profile-user-info">
                        <p>Nombre: {user.name}</p>
                        <p>Email: {user.email}</p>
                        <p>Rol: {user.role}</p>
                    </section>
                )}

                <h2>Perfil nutricional</h2>

                <form className="profile-form" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="age">Edad</label>

                        <input
                            id="age"
                            type="number"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="height">Altura en metros</label>

                        <input
                            id="height"
                            type="number"
                            step="0.01"
                            min="0"
                            name="height"
                            value={formData.height}
                            onChange={handleChange}
                            placeholder="Ej: 1,80"
                        />
                    </div>

                    <div>
                        <label htmlFor="weight">Peso en kg</label>

                        <input
                            id="weight"
                            type="number"
                            step="0.1"
                            min="0"
                            name="weight"
                            value={formData.weight}
                            onChange={handleChange}
                            placeholder="Ej: 72,5"
                        />
                    </div>

                    <div>
                        <label htmlFor="goal">Objetivo</label>

                        <select
                            id="goal"
                            name="goal"
                            value={formData.goal}
                            onChange={handleChange}
                        >
                            <option value="lose_weight">Perder peso</option>
                            <option value="maintain_weight">Mantener peso</option>
                            <option value="gain_muscle">Ganar músculo</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="activityLevel">
                            Nivel de actividad
                        </label>

                        <select
                            id="activityLevel"
                            name="activityLevel"
                            value={formData.activityLevel}
                            onChange={handleChange}
                        >
                            <option value="low">Bajo</option>
                            <option value="medium">Medio</option>
                            <option value="high">Alto</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="dietType">Tipo de dieta</label>

                        <select
                            id="dietType"
                            name="dietType"
                            value={formData.dietType}
                            onChange={handleChange}
                        >
                            <option value="standard">Estándar</option>
                            <option value="vegetarian">Vegetariana</option>
                            <option value="vegan">Vegana</option>
                            <option value="gluten_free">Sin gluten</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="allergies">Alergias</label>

                        <input
                            id="allergies"
                            type="text"
                            name="allergies"
                            value={formData.allergies}
                            onChange={handleChange}
                            placeholder="Ej: lactosa, frutos secos..."
                        />
                    </div>

                    {/* Si existe perfil Actualizar perfil si no  Crear perfil*/}
                    <button type="submit">
                        {profile ? "Actualizar perfil" : "Crear perfil"}
                    </button>
                </form>

                {message && (<p className="profile-message">{message}</p>)}

                {error && (<p className="profile-error">{error}</p>)}

                <button className="logout-button" onClick={handleLogout}>
                    Cerrar sesión
                </button>
            </section>
        </main>
    );
};

export default ProfilePage; // Exportamos para poder usarla en App.jsx