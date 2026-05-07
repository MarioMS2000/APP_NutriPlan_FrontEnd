import { Navigate } from "react-router-dom"; // Para redirigir al usuario a otra ruta
import { useAuth } from "../context/useAuth"; // Importa hook de autenticación (saber si esta logeado o no)

const ProtectedRoute = ({ children }) => {

    const { isAuthenticated } = useAuth(); // Le contexto ¿usuario autenticado?

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />; // Si no esta logeado va a login. replace hace que no pueda volver atrás fácilmente con el botón del navegador a la ruta protegida
    }

    return children; // Si esta autenticado muestra componente protegido que es profile
};

export default ProtectedRoute; // Para usar en App.jsx