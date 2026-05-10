// Renderiza la lista
import RecipeCard from "../RecipeCard/RecipeCard";

import "./RecipeList.css";

const RecipeList = ({ recipes }) => {
    return (
        <section className="recipe-list">
            {recipes.map((recipe) => (
                <RecipeCard key={recipe._id} recipe={recipe} />
            ))}
        </section>
    );
};

export default RecipeList;