import api from "./api"; // Importo la configuración de axios que tiene configurada la URL base

// Perfil nutricional del usuario logueado
// GET -> http://localhost:3000/api/nutrition-profile/me
export const getMyNutritionProfile = async (token) => {
    const response = await api.get("/nutrition-profile/me", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};

// Crear perfil nutricional del usuario logueadopro. profileData → datos del formulario | token → token del usuario logueado
// POST -> http://localhost:3000/api/nutrition-profile
export const createNutritionProfile = async (profileData, token) => {
    // Post al back 
    const response = await api.post("/nutrition-profile", profileData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    // Authorization: `Bearer ${token}` -> Envías el token para que el backend sepa qué usuario está creando el perfil

    return response.data;
};

// Actualizar el perfil nutricional del usuario logueado. profileData → nuevos datos del perfil | token → token del usuario
// UPDATE -> http://localhost:3000/api/nutrition-profile
export const updateNutritionProfile = async (profileData, token) => {
    // Put al back
    const response = await api.put("/nutrition-profile", profileData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};