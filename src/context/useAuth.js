// hook personalizado para consumir el contexto de forma global
import { useContext } from "react"; // useContext → lee esos datos desde cualquier componente
import { AuthContext } from "./auth-context";

export const useAuth = () => {
    return useContext(AuthContext);
};