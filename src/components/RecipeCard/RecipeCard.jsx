// Representa UNA receta
import "./RecipeCard.css";

const RecipeCard = ({ recipe }) => {
    return (
        <article className="recipe-card">
            <img src={recipe.image} alt={recipe.title} />

            <div className="recipe-card-content">
                <h2>{recipe.title}</h2>

                <p>{recipe.description}</p>

                <p>🔥 {recipe.calories} kcal</p>

                <p>💪 Dificultad: {recipe.difficulty}</p>

                <p>🥗 Dieta: {recipe.dietType}</p>
            </div>
        </article>
    );
};

export default RecipeCard;