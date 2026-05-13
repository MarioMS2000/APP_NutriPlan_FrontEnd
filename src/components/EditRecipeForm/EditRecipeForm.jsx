import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useAuth } from "../../context/useAuth";
import { getRecipes, updateRecipe } from "../../services/recipe.service";
import IngredientInputs from "../RecipeFormFields/IngredientInputs";
import StepInputs from "../RecipeFormFields/StepInputs";

import "./EditRecipeForm.css";

const EditRecipeForm = () => {
    const { token } = useAuth();
    const { recipeId } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        image: "",
        prepTime: "",
        difficulty: "easy",
        dietType: "standard",
        calories: "",
        protein: "",
        carbs: "",
        fat: "",
    });

    const [ingredients, setIngredients] = useState([
        { name: "", quantity: "", unit: "" },
    ]);

    const [steps, setSteps] = useState([""]);

    const loadRecipe = async () => {
        try {
            const data = await getRecipes();

            const recipe = data.recipes.find(
                (recipe) => recipe._id === recipeId
            );

            if (!recipe) {
                alert("Receta no encontrada");
                navigate("/admin");
                return;
            }

            setFormData({
                title: recipe.title || "",
                description: recipe.description || "",
                image: recipe.image || "",
                prepTime: recipe.prepTime || "",
                difficulty: recipe.difficulty || "easy",
                dietType: recipe.dietType || "standard",
                calories: recipe.calories || "",
                protein: recipe.macros?.protein || "",
                carbs: recipe.macros?.carbs || "",
                fat: recipe.macros?.fat || "",
            });

            setIngredients(
                recipe.ingredients?.length > 0
                    ? recipe.ingredients
                    : [{ name: "", quantity: "", unit: "" }]
            );

            setSteps(recipe.steps?.length > 0 ? recipe.steps : [""]);
        } catch (error) {
            alert("Error al cargar la receta");
        }
    };

    useEffect(() => {
        loadRecipe();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleIngredientChange = (index, e) => {
        const { name, value } = e.target;

        const updatedIngredients = [...ingredients];

        updatedIngredients[index] = {
            ...updatedIngredients[index],
            [name]: value,
        };

        setIngredients(updatedIngredients);
    };

    const addIngredient = () => {
        setIngredients([
            ...ingredients,
            { name: "", quantity: "", unit: "" },
        ]);
    };

    const removeIngredient = (index) => {
        setIngredients(ingredients.filter((_, i) => i !== index));
    };

    const handleStepChange = (index, e) => {
        const updatedSteps = [...steps];

        updatedSteps[index] = e.target.value;

        setSteps(updatedSteps);
    };

    const addStep = () => {
        setSteps([...steps, ""]);
    };

    const removeStep = (index) => {
        setSteps(steps.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const recipeData = {
            title: formData.title,
            description: formData.description,
            image: formData.image,
            prepTime: Number(formData.prepTime),
            difficulty: formData.difficulty,
            dietType: formData.dietType,
            calories: Number(formData.calories),

            macros: {
                protein: Number(formData.protein),
                carbs: Number(formData.carbs),
                fat: Number(formData.fat),
            },

            ingredients: ingredients.map((ingredient) => ({
                name: ingredient.name,
                quantity: Number(ingredient.quantity),
                unit: ingredient.unit,
            })),

            steps,
            tags: [],
        };

        try {
            await updateRecipe(recipeId, recipeData, token);

            alert("Receta actualizada correctamente");

            navigate("/admin");
        } catch (error) {
            alert(error.response?.data?.message || "Error al actualizar receta");
        }
    };

    return (
        <form className="edit-recipe-form" onSubmit={handleSubmit}>
            <input
                type="text"
                name="title"
                placeholder="Título"
                value={formData.title}
                onChange={handleChange}
            />

            <textarea
                name="description"
                placeholder="Descripción"
                value={formData.description}
                onChange={handleChange}
            />

            <input
                type="text"
                name="image"
                placeholder="URL imagen"
                value={formData.image}
                onChange={handleChange}
            />

            <input
                type="number"
                name="prepTime"
                placeholder="Tiempo preparación"
                value={formData.prepTime}
                onChange={handleChange}
            />

            <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
            >
                <option value="easy">Fácil</option>
                <option value="medium">Media</option>
                <option value="hard">Difícil</option>
            </select>

            <select
                name="dietType"
                value={formData.dietType}
                onChange={handleChange}
            >
                <option value="standard">Estándar</option>
                <option value="vegetarian">Vegetariana</option>
                <option value="vegan">Vegana</option>
                <option value="gluten_free">Sin gluten</option>
            </select>
            <input
                type="number"
                name="calories"
                placeholder="Calorías"
                value={formData.calories}
                onChange={handleChange}
            />

            <input
                type="number"
                name="protein"
                placeholder="Proteína"
                value={formData.protein}
                onChange={handleChange}
            />

            <input
                type="number"
                name="carbs"
                placeholder="Carbohidratos"
                value={formData.carbs}
                onChange={handleChange}
            />

            <input
                type="number"
                name="fat"
                placeholder="Grasas"
                value={formData.fat}
                onChange={handleChange}
            />

            <IngredientInputs
                ingredients={ingredients}
                handleIngredientChange={handleIngredientChange}
                addIngredient={addIngredient}
                removeIngredient={removeIngredient}
                rowClassName="edit-recipe-form-row-3"
            />

            <StepInputs
                steps={steps}
                handleStepChange={handleStepChange}
                addStep={addStep}
                removeStep={removeStep}
                rowClassName="edit-recipe-form-row"
            />

            <button type="submit">Guardar cambios</button>
        </form>
    );
};

export default EditRecipeForm;