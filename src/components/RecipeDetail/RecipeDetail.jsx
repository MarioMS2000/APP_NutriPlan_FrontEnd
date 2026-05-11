// Pinta estructura principal: titulo, imagen, descripcion y organiza subcomponentes
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/useAuth";
import { addFavorite, removeFavorite, checkFavorite, } from "../../services/favorite.service";
import { addRecipeToWeeklyPlan } from "../../services/weeklyPlan.service";


import RecipeMacros from "./RecipeMacros";
import RecipeIngredients from "./RecipeIngredients";
import RecipeSteps from "./RecipeSteps";
import "./RecipeDetail.css";

const RecipeDetail = ({ recipe }) => {
    const navigate = useNavigate(); // vuelve a la página anterior real del navegador
    const { token } = useAuth();

    const [isFavorite, setIsFavorite] = useState(false);
    const [planData, setPlanData] = useState({ day: "monday", mealType: "lunch" });

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
        // Si no hay token evitamos acciones
        if (!token) {
            alert("Debes iniciar sesión");
            return;
        }

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

    // Actualiza el formulario dinámicamente
    const handlePlanChange = (e) => {
        const { name, value } = e.target;

        setPlanData({
            ...planData,
            [name]: value,
        });
    };

    // Envía la receta + datos del plan al backend para guardarla en el plan semanal del usuario
    const handleAddToWeeklyPlan = async () => {
        // Si no hay token evitamos acciones
        if (!token) {
            alert("Debes iniciar sesión");
            return;
        }

        try {
            await addRecipeToWeeklyPlan(recipe._id, planData, token); // Llamo al backend para guardar la receta en el plan semanal. recipe._id -> La receta que quieres añadir. planData -> Los datos del formulario

            alert("Receta añadida al plan semanal");
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Error al añadir al plan semanal"
            );
        }
    };


    return (
        <main className="recipe-detail">

            <button onClick={() => navigate(-1)}> {/*vuelve a la página anterior real del navegador*/}
                ← Volver
            </button>

            <h1>{recipe.title}</h1>

            <img src={recipe.image} alt={recipe.title} />

            <p>{recipe.description}</p>

            <button onClick={handleFavoriteToggle}>
                {isFavorite
                    ? "❤️ Quitar de favoritos"
                    : "🤍 Añadir a favoritos"}
            </button>

            <section className="weekly-plan-actions">
                <h2>Añadir al plan semanal</h2>

                <select name="day" value={planData.day} onChange={handlePlanChange}>
                    <option value="monday">Lunes</option>
                    <option value="tuesday">Martes</option>
                    <option value="wednesday">Miércoles</option>
                    <option value="thursday">Jueves</option>
                    <option value="friday">Viernes</option>
                    <option value="saturday">Sábado</option>
                    <option value="sunday">Domingo</option>
                </select>

                <select
                    name="mealType"
                    value={planData.mealType}
                    onChange={handlePlanChange}
                >
                    <option value="breakfast">Desayuno</option>
                    <option value="lunch">Comida</option>
                    <option value="dinner">Cena</option>
                    <option value="snack">Snack</option>
                </select>

                <button onClick={handleAddToWeeklyPlan}>
                    ➕ Añadir al plan
                </button>
            </section>

            <RecipeMacros recipe={recipe} />

            <RecipeIngredients ingredients={recipe.ingredients} />

            <RecipeSteps steps={recipe.steps} />
        </main>
    );
};

export default RecipeDetail;