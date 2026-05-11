import api from "./api"; // Importo la configuración de axios que tiene configurada la URL base

// GET /api/weekly-plan
export const getWeeklyPlan = async (token) => {
    const response = await api.get("/weekly-plan", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};
// POST /api/weekly-plan/:recipeId
export const addRecipeToWeeklyPlan = async (recipeId, planData, token) => {
    const response = await api.post(`/weekly-plan/${recipeId}`, planData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};
// DELETE /api/weekly-plan/:id
export const removeRecipeFromWeeklyPlan = async (planItemId, token) => {
    const response = await api.delete(`/weekly-plan/${planItemId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};