import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getRecipeById } from "../services/recipe.service";

import RecipeDetail from "../components/RecipeDetail/RecipeDetail";

const RecipeDetailPage = () => {
    const { id } = useParams();

    const [recipe, setRecipe] = useState(null);
    const [error, setError] = useState("");

    const loadRecipe = async () => {
        try {
            setError("");

            const data = await getRecipeById(id);

            setRecipe(data.recipe);
        } catch (error) {
            setError("Error al cargar la receta");
        }
    };

    useEffect(() => {
        loadRecipe();
    }, [id]);

    if (error) return <p>{error}</p>;

    if (!recipe) return <p>Cargando receta...</p>;

    return <RecipeDetail recipe={recipe} />;
};

export default RecipeDetailPage;