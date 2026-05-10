// Pinta estructura principal: titulo, imagen, descripcion y organiza subcomponentes
import { useNavigate } from "react-router-dom";

import RecipeMacros from "./RecipeMacros";
import RecipeIngredients from "./RecipeIngredients";
import RecipeSteps from "./RecipeSteps";
import "./RecipeDetail.css";

const RecipeDetail = ({ recipe }) => {
    const navigate = useNavigate(); // vuelve a la página anterior real del navegador
    return (
        <main className="recipe-detail">

            <button onClick={() => navigate(-1)}> {/*vuelve a la página anterior real del navegador*/}
                ← Volver
            </button>

            <h1>{recipe.title}</h1>

            <img src={recipe.image} alt={recipe.title} />

            <p>{recipe.description}</p>

            <RecipeMacros recipe={recipe} />

            <RecipeIngredients ingredients={recipe.ingredients} />

            <RecipeSteps steps={recipe.steps} />
        </main>
    );
};

export default RecipeDetail;