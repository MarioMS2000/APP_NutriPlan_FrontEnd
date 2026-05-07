import { useNavigate } from "react-router-dom"; // Para poder redirigir al usuario desde JavaScript
import { useAuth } from "../context/useAuth"; // Importas el hook de autenticación para acceder al contexto global

const ProfilePage = () => {

    const navigate = useNavigate(); // Creo función navigate

    const { user, logout } = useAuth(); // Sacas la función login del contexto global. user → datos del usuario logueado y logout → función para cerrar sesión

    // Se ejecutará cuando pulse el botón de cerrar sesión
    const handleLogout = () => {

        // Cierra sesión
        logout(); // Hace esto -> setUser(null), setToken(null), borra el token del localStorage

        navigate("/login"); // Redirige al usuario a /login

    };

    return (
        <main>
            <h1>Perfil</h1>

            {/* user && -> si existe user, muestra lo de dentro. Si es null no muestres su contenido */}
            {user && (
                <section>
                    <p>Nombre: {user.name}</p>
                    <p>Email: {user.email}</p>
                    <p>Rol: {user.role}</p>
                </section>
            )}

            <button onClick={handleLogout}>Cerrar sesión</button>
        </main>
    );

};

export default ProfilePage; // Exportamos para poder usarla en App.jsx