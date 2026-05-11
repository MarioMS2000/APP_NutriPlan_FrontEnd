import api from "./api"; // Importo la configuración de axios que tiene configurada la URL base

export const addFavorite = async (recipeId, token) => {
    const response = await api.post(
        `/favorites/${recipeId}`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return response.data;
};

export const getFavorites = async (token) => {
    const response = await api.get("/favorites", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};

export const removeFavorite = async (recipeId, token) => {
    const response = await api.delete(
        `/favorites/${recipeId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};

export const checkFavorite = async (recipeId, token) => {
    const response = await api.get(
        `/favorites/check/${recipeId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};