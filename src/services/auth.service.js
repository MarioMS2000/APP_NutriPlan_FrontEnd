import api from "./api"; // Importo la configuración de axios que tiene configurada la URL base

export const registerUser = async (userData) => {

    // Peticion POST -> http://localhost:3000/api/auth/register
    const response = await api.post("/auth/register", userData);

    return response.data; // Devuelve solo el JSON que responde el backend dara = { ok: true, user: {...}, token: "..."}
};

export const loginUser = async (credentials) => {

    const response = await api.post("/auth/login", credentials);

    return response.data;
};