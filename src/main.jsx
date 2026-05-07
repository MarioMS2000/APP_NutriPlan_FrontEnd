import { StrictMode } from "react"; // Detectar posibles problemas durante desarrollo
import { createRoot } from "react-dom/client"; // Conecta React con el DOM real del navegador
import { BrowserRouter } from "react-router-dom"; // Permite usar rutas en React (/login...)
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import "./index.css";


// Busca en el HTML un elemento con id root y le dice <div id="root"></div> renderiza mi aplicación dentro de este div
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);

// <StrictMode> -> Envuelve la app en modo estricto
// <BrowserRouter> -> puedes navegar entre páginas sin recargar toda la web
// <AuthProvider> -> Envuelve la app y comparte globalmente el estado de autenticación (user, token, login, logout...)
// <App /> -> Renderiza tu componente principal