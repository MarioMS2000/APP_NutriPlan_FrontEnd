// Pinta estructura principal: titulo, imagen, descripcion y organiza subcomponentes
import RecipeMacros from "./RecipeMacros";
import RecipeIngredients from "./RecipeIngredients";
import RecipeSteps from "./RecipeSteps";
import "./RecipeDetail.css";

const RecipeDetail = ({ recipe }) => {
    return (
        <main className="recipe-detail">
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