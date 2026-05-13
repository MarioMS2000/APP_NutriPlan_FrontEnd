import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import { deleteRecipe, getRecipes } from "../../services/recipe.service";

import "./AdminRecipeList.css";

const AdminRecipeList = () => {
    const { token } = useAuth(); // Ese token hace falta para eliminar recetas porque es una acción protegida

    const [recipes, setRecipes] = useState([]);

    // Cargar recetas
    const loadRecipes = async () => {
        const data = await getRecipes(); // LLamamos al backend
        setRecipes(data.recipes);
    };

    useEffect(() => {
        loadRecipes();
    }, []);

    const handleDelete = async (recipeId) => {
        const confirmDelete = window.confirm(
            "¿Estás seguro de que quieres eliminar esta receta?"
        );

        if (!confirmDelete) return;

        try {
            await deleteRecipe(recipeId, token); // LLamamos al backend para eliminar la receta y necesitamos el token para saber que es admin

            setRecipes(recipes.filter((recipe) => recipe._id !== recipeId)); // Deja todas las recetas menos la que tiene este recipeId

            alert("Receta eliminada correctamente");
        } catch (error) {
            alert("Error al eliminar receta");
        }
    };

    return (
        <section>
            <h2>Recetas existentes</h2>

            <div className="admin-recipe-list">
                {recipes.map((recipe) => (
                    <article className="admin-recipe-card" key={recipe._id}>
                        <div className="admin-recipe-info">
                            <h3>{recipe.title}</h3>
                            <p>{recipe.calories} kcal</p>
                        </div>

                        <div className="admin-recipe-actions">
                            <Link
                                className="admin-edit-link"
                                to={`/admin/recipes/edit/${recipe._id}`}
                            >
                                Editar
                            </Link>

                            <button
                                className="admin-delete-button"
                                onClick={() => handleDelete(recipe._id)}
                            >
                                Eliminar
                            </button>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
};

export default AdminRecipeList;