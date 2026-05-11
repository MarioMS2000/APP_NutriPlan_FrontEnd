import { Link } from "react-router-dom"; // Navegar entre páginas en React Router sin recargar la web

import "./HomePage.css";

const HomePage = () => {
    return (
        <main className="home-page">

            <section className="hero">
                <div className="hero-content">
                    <h1>NutriPlan</h1>

                    <p>
                        Planifica tus comidas, descubre recetas saludables
                        y guarda tus favoritas en un solo lugar.
                    </p>

                    <div className="hero-buttons">
                        <Link to="/recipes">
                            Ver recetas
                        </Link>

                        <Link to="/register">
                            Empezar ahora
                        </Link>
                    </div>
                </div>
            </section>

            <section className="features">
                <h2>¿Qué puedes hacer?</h2>

                <div className="features-grid">

                    <article className="feature-card">
                        <h3>🍽️ Recetas saludables</h3>

                        <p>
                            Explora recetas filtrando por dificultad,
                            dieta o calorías.
                        </p>
                    </article>

                    <article className="feature-card">
                        <h3>❤️ Favoritos</h3>

                        <p>
                            Guarda tus recetas favoritas y accede
                            rápidamente a ellas.
                        </p>
                    </article>

                    <article className="feature-card">
                        <h3>📊 Perfil nutricional</h3>

                        <p>
                            Configura tu perfil y adapta la experiencia
                            a tus objetivos.
                        </p>
                    </article>

                </div>
            </section>

        </main>
    );
};

export default HomePage;