// Renderiza pasos
const RecipeSteps = ({ steps }) => {
    return (
        <section>
            <h2>Pasos</h2>

            <ol>
                {steps.map((step, index) => (
                    <li key={index}>{step}</li>
                ))}
            </ol>
        </section>
    );
};

export default RecipeSteps;