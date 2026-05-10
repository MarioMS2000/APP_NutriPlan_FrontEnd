// Formulario de filtros. Muestra inputs
import "./RecipeFilters.css";
const RecipeFilters = ({
    filters,
    handleChange,
    handleSubmit,
}) => {
    return (
        <form className="recipe-filters" onSubmit={handleSubmit}>
            <input
                type="text"
                name="search"
                value={filters.search}
                onChange={handleChange}
                placeholder="Buscar receta..."
            />

            <select
                name="dietType"
                value={filters.dietType}
                onChange={handleChange}
            >
                <option value="">Todas las dietas</option>
                <option value="standard">Estándar</option>
                <option value="vegetarian">Vegetariana</option>
                <option value="vegan">Vegana</option>
                <option value="gluten_free">Sin gluten</option>
            </select>

            <select
                name="difficulty"
                value={filters.difficulty}
                onChange={handleChange}
            >
                <option value="">Todas las dificultades</option>
                <option value="easy">Fácil</option>
                <option value="medium">Media</option>
                <option value="hard">Difícil</option>
            </select>

            <input
                type="number"
                name="maxCalories"
                value={filters.maxCalories}
                onChange={handleChange}
                placeholder="Máx. calorías"
            />

            <button type="submit">Filtrar</button>
        </form>
    );
};

export default RecipeFilters;