// Mete datos dentro del contexto
import { useState } from "react"; // useState → guarda estados como user y token
import { AuthContext } from "./auth-context";

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

    const logout = () => {

        // Borramos
        setUser(null);
        setToken(null);

        localStorage.removeItem("token");
    };

    const isAuthenticated = !!token; // Convertimos el token en booleano. Si hay token → true y si no → false

    // Compartimos los datos globalmente mediante el Provider y en value -> defines qué datos compartes globalmente. Cualquier componente podrá usarlos
    return (
        <AuthContext.Provider
            value={{ user, token, login, logout, isAuthenticated }}
        >
            {children}
        </AuthContext.Provider>
    );
};
