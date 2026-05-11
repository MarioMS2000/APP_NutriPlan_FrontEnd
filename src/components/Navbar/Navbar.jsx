import { Link } from "react-router-dom"; // Navegar entre páginas en React Router sin recargar la web
import { useAuth } from "../../context/useAuth"; // Accede al estado global de autenticación

import "./Navbar.css";

const Navbar = () => {
    const { token, logout } = useAuth();

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