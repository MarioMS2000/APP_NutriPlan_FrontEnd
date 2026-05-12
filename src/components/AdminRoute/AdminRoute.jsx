import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

// children es lo que envuelves dentro. Sería el <AdminPage /> que esta dentro de AdminRoute en el App.jsx
const AdminRoute = ({ children }) => {
    const { token, user } = useAuth(); // user -> datos del usuario, incluido su role

    // Si no hay token logueate 
    if (!token) {
        return <Navigate to="/login" />;
    }

    // Si el usuario existe pero su rol no es "admin", lo manda al inicio
    if (user?.role !== "admin") {
        return <Navigate to="/" />;
    }

    return children; // Si tiene token y además es admin, entonces deja ver la página protegida
};

export default AdminRoute;