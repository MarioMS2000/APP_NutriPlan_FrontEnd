// Representa UNA receta
import { Link } from "react-router-dom";
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

                <Link to={`/recipes/${recipe._id}`}>Ver detalle</Link> {/*Link viene de React Router y reemplaza al <a> tradicional en React */}
            </div>
        </article>
    );
};

export default RecipeCard;