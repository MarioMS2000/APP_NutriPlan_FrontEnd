// Guarda estados, llama al backend, controla lógica, organiza componentes
import { useEffect, useState } from "react";
import { getRecipes } from "../services/recipe.service"; // Importa función que llama al backend
import RecipeFilters from "../components/RecipeFilters/RecipeFilters";
import RecipeList from "../components/RecipeList/RecipeList";

const RecipesPage = () => {
    const [recipes, setRecipes] = useState([]); // Estado para guardar recetas
    const [filters, setFilters] = useState({
        search: "",
        dietType: "",
        difficulty: "",
        maxCalories: "",
    }); // Estado para guardar lo que el usuario escribe/selecciona en el formulario
    const [error, setError] = useState("");

    // Cargar recetas desde el backend
    const loadRecipes = async () => {
        try {
            setError("");

            const data = await getRecipes(filters); // Llamamos al service y carga los filters. Peticion tipo /recipes?search=pollo&dietType=standard

            setRecipes(data.recipes);
        } catch (error) {
            setError("Error al cargar recetas");
        }
    };

    useEffect(() => {
        loadRecipes();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFilters({
            ...filters,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        loadRecipes(); // Busca recetas usando los filtros actuales

    };

    return (
        <main>
            <h1>Recetas</h1>

            <RecipeFilters
                filters={filters}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />

            {error && <p>{error}</p>}

            {/*si no hay recetas → muestra mensaje y si hay recetas → las lista */}
            {recipes.length === 0 ? (
                <p>No hay recetas disponibles</p>
            ) : (
                <RecipeList recipes={recipes} />
            )}
        </main>
    );
};

export default RecipesPage;