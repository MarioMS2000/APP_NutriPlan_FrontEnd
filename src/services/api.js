import axios from "axios"; // Sirve para hacer peticiones HTTP al backend

// Creo mi propio axios ya configurado
const api = axios.create({
    // Defino la URL base del backend, usa la del .env si no existe usa http://localhost:3000/api
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
});

export default api;