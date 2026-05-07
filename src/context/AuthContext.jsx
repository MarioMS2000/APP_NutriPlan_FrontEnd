// Mete datos dentro del contexto
import { useEffect, useState } from "react"; // useState → guarda estados como user y token. useEffect → ejecutar código cuando cambie algo o cargue el componente
import { AuthContext } from "./auth-context";
import { getMe } from "../services/auth.service";

// Proveedor del contexto | children -> componentes que estarán dentro de <AuthProvider>
export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token")); // Intenta leer token guardado en localstorage, si existe lo carga y si no es null


    // Se ejecuta cuando se monta el componente y cada vez que cambie token
    useEffect(() => {
        // Función async interna para cargar el usuario. No puedes poner directamente async en el callback de useEffect, por eso creas una función dentro
        const loadUser = async () => {
            if (!token) return;
            
            try {
                const data = await getMe(token); // LLamo al backend con el token. El backend valida el token y devuelve el usuario

                setUser(data.user); // Guardo el usuario en el contexto global. Así ProfilePage puede mostrarlo aunque recargues la página

            } catch (error) {
                
            }
        };
    },[token]);

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
