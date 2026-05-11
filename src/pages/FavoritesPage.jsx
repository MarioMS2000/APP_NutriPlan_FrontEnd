import { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";
import { getFavorites } from "../services/favorite.service";
import RecipeList from "../components/RecipeList/RecipeList";

const FavoritesPage = () => {
    const { token } = useAuth();

    const [recipes, setRecipes] = useState([]);

    const [error, setError] = useState("");

    const loadFavorites = async () => {
        try {
            setError("");

            const data = await getFavorites(token);

            setRecipes(data.recipes);
        } catch (error) {
            setError("Error al cargar favoritos");
        }
    };

    useEffect(() => {
        loadFavorites();
    }, []);

    return (
        <main className="recipes-page">
            <h1>Mis favoritos ❤️</h1>

            {error && <p>{error}</p>}

            {recipes.length === 0 ? (
                <p>No tienes recetas favoritas</p>
            ) : (
                <RecipeList recipes={recipes} />
            )}
        </main>
    );
};

export default FavoritesPage;