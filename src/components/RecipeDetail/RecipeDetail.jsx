// Pinta estructura principal: titulo, imagen, descripcion y organiza subcomponentes
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import { addFavorite, removeFavorite, checkFavorite, } from "../../services/favorite.service";
import { useEffect, useState } from "react";


import RecipeMacros from "./RecipeMacros";
import RecipeIngredients from "./RecipeIngredients";
import RecipeSteps from "./RecipeSteps";
import "./RecipeDetail.css";

const RecipeDetail = ({ recipe }) => {
    const navigate = useNavigate(); // vuelve a la página anterior real del navegador
    const { token } = useAuth();

    const [isFavorite, setIsFavorite] = useState(false);

    const loadFavoriteStatus = async () => {
        try {
            const data = await checkFavorite(recipe._id, token);

            setIsFavorite(data.isFavorite);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (token) {
            loadFavoriteStatus();
        }
    }, [recipe._id, token]);

    // Añadir receta a favoritos
    const handleFavoriteToggle = async () => {
        try {
            if (isFavorite) {
                await removeFavorite(recipe._id, token);

                setIsFavorite(false);

                alert("Favorito eliminado");
            } else {
                await addFavorite(recipe._id, token);

                setIsFavorite(true);

                alert("Receta añadida a favoritos");
            }
        } catch (error) {
            alert("Error al gestionar favorito");
        }
    };


    return (
        <main className="recipe-detail">

            <button onClick={() => navigate(-1)}> {/*vuelve a la página anterior real del navegador*/}
                ← Volver
            </button>

            <h1>{recipe.title}</h1>

            <img src={recipe.image} alt={recipe.title} />

            <button onClick={handleFavoriteToggle}>
                {isFavorite
                    ? "❤️ Quitar de favoritos"
                    : "🤍 Añadir a favoritos"}
            </button>

            <p>{recipe.description}</p>

            <RecipeMacros recipe={recipe} />

            <RecipeIngredients ingredients={recipe.ingredients} />

            <RecipeSteps steps={recipe.steps} />
        </main>
    );
};

export default RecipeDetail;