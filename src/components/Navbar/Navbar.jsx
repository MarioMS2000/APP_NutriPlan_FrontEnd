import { Link } from "react-router-dom"; // Permite navegar entre rutas sin recargar toda la aplicación
import { useAuth } from "../../context/useAuth"; // Hook personalizado para acceder al contexto de autenticación (token, user, logout, etc.)
import "./Navbar.css";

const Navbar = () => {
    const { token, logout, user } = useAuth();

    return (
        <header className="navbar">
            <div className="navbar-logo">
                <Link to="/">NutriPlan</Link>
            </div>

            <nav className="navbar-links">
                {token ? (
                    <>
                        <Link to="/recipes">Recetas</Link>

                        <Link to="/favorites">Favoritos</Link>

                        <Link to="/profile">Perfil</Link>

                        {user?.role === "admin" && (
                            <Link to="/admin">Admin</Link>
                        )}

                        <Link to="/weekly-plan">Plan semanal</Link>

                        <button onClick={logout}>
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>

                        <Link to="/register">Register</Link>
                    </>
                )}
            </nav>
        </header>
    );
};

export default Navbar;