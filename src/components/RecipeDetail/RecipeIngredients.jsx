// Renderiza ingredientes
const RecipeIngredients = ({ ingredients }) => {
    return (
        <section>
            <h2>Ingredientes</h2>

            <ul>
                {ingredients.map((ingredient, index) => (
                    <li key={index}>
                        {ingredient.quantity} {ingredient.unit} de {ingredient.name}
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default RecipeIngredients;