import api from "./api"; // Importo la configuración de axios que tiene configurada la URL base


// filters = {} -> si no me pasan filtros, uso un objeto vacío
export const getRecipes = async (filters = {}) => {
    // params: filters -> filters = { dietType: "vegan", difficulty: "easy" }
    // Y con axios lo convierte a /recipes?dietType=vegan&difficulty=easy
    const response = await api.get("/recipes", {
        params: filters,
    });

    return response.data;
};

// Pedir una receta concreta por su ID
export const getRecipeById = async (id) => {
    const response = await api.get(`/recipes/${id}`);

    return response.data;
};

// Borrar receta
export const deleteRecipe = async (recipeId, token) => {
    const response = await api.delete(`/recipes/${recipeId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};

// Editar una receta
export const updateRecipe = async (recipeId, recipeData, token) => {
    const response = await api.put(`/recipes/${recipeId}`, recipeData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};