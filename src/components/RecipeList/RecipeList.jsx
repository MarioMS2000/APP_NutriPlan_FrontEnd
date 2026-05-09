// Renderiza la lista
import RecipeCard from "../RecipeCard/RecipeCard";

const RecipeList = ({ recipes }) => {
    return (
        <section>
            {recipes.map((recipe) => (
                <RecipeCard key={recipe._id} recipe={recipe} />
            ))}
        </section>
    );
};

export default RecipeList;