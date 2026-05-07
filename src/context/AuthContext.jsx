// Contexto global de autenticación
import { createContext, useContext, useState } from "react"; // createContext → crea un contexto global, useContext → permite leer ese contexto, useState → guarda estados como user y token

const AuthContext = createContext(); // Donde guardar datos del login

// Proveedor del contexto | children -> componentes que estarán dentro de <AuthProvider>

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token")); // Intenta leer token guardado en localstorage, si existe lo carga y si no es null

    const login = ({ user, token }) => {

        //Guarda ambos en el estado global
        setUser(user);
        setToken(token);

        // Guarda el token en el navegador. Así, si recargas la página, no pierdes la sesión inmediatamente
        localStorage.setItem("token", token);
    };
};