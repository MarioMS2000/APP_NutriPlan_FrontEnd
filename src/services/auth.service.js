import api from "./api"; // Importo la configuración de axios que tiene configurada la URL base

export const registerUser = async (userData) => {

    // Peticion POST al back -> http://localhost:3000/api/auth/register
    const response = await api.post("/auth/register", userData);

    return response.data; // Devuelve solo el JSON que responde el backend dara = { ok: true, user: {...}, token: "..."}
};

export const loginUser = async (credentials) => {

    const response = await api.post("/auth/login", credentials);

    return response.data;
};


// Mantener sesion iniciada
export const getMe = async (token) => { // Recibe el token

    // Peticion GET al back -> http://localhost:3000/api/auth/me
    const response = await api.get("/auth/me", {
        // Configuramos header de la petición y enviamos el token en el header
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};