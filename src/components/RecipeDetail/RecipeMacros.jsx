// Muestra proteínas carbs, grasas, calorías

const RecipeMacros = ({ recipe }) => {
    return (
        <section>
            <h2>Información nutricional</h2>

            <p>Calorías: {recipe.calories} kcal</p>
            <p>Proteína: {recipe.macros.protein} g</p>
            <p>Carbohidratos: {recipe.macros.carbs} g</p>
            <p>Grasas: {recipe.macros.fat} g</p>
        </section>
    );
};

export default RecipeMacros;