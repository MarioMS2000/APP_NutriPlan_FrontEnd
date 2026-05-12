import { useState } from "react";
import { useAuth } from "../../context/useAuth";
import api from "../../services/api";

import IngredientInputs from "./IngredientInputs";
import StepInputs from "./StepInputs";

const CreateRecipeForm = () => {
    const { token } = useAuth();

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

    // Guardamos ingredientes y pasos en estados separados
    const [ingredients, setIngredients] = useState([
        { name: "", quantity: "", unit: "" },
    ]);

    // Pasos
    const [steps, setSteps] = useState([""]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Función para cambiar un ingrediente concreto
    const handleIngredientChange = (index, e) => {
        const { name, value } = e.target; // Saca el campo que cambié

        const updatedIngredients = [...ingredients]; // Copia del array ingredientes

        // Actualiza solo el ingrediente que corresponde a ese index
        updatedIngredients[index] = {
            ...updatedIngredients[index],
            [name]: value,
        };

        setIngredients(updatedIngredients); // Guarda el nuevo array actualizado
    };

    // Añade otro ingrediente vacío
    const addIngredient = () => {
        // Mantiene los ingredientes actuales y añade uno nuevo vacío
        setIngredients([
            ...ingredients,
            { name: "", quantity: "", unit: "" },
        ]);
    };

    // Crea un nuevo array quitando el ingrediente cuyo índice coincide. _ significa: “no me interesa este valor”. i es el índice actual
    const removeIngredient = (index) => {
        setIngredients(ingredients.filter((_, i) => i !== index));
    };

    // Función para cambiar un paso concreto
    const handleStepChange = (index, e) => {
        const updatedSteps = [...steps]; // Copia el array de pasos

        updatedSteps[index] = e.target.value; // Cambia el paso concreto

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

        try {
            await api.post(
                "/recipes",
                {
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
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert("Receta creada correctamente");

            setFormData({
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

            setIngredients([{ name: "", quantity: "", unit: "" }]);
            setSteps([""]);
        } catch (error) {
            alert(error.response?.data?.message || "Error al crear receta");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
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
            />

            <StepInputs
                steps={steps}
                handleStepChange={handleStepChange}
                addStep={addStep}
                removeStep={removeStep}
            />

            <button type="submit">Crear receta</button>
        </form>
    );
};

export default CreateRecipeForm;