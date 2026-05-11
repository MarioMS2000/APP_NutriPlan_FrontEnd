import { Routes, Route } from "react-router-dom"; // cuando la URL sea X, muestra este componente

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import RecipesPage from "./pages/RecipesPage";
import ProfilePage from "./pages/ProfilePage";
import ProtectedRoute from "./routes/ProtectedRoute";
import RecipeDetailPage from "./pages/RecipeDetailPage";
import FavoritesPage from "./pages/FavoritesPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/recipes" element={<RecipesPage />} />
      <Route path="/profile" element={ <ProtectedRoute> <ProfilePage /> </ProtectedRoute> } />
      <Route path="/recipes/:id" element={<RecipeDetailPage />} />
      <Route path="/favorites" element={<FavoritesPage />} />
    </Routes>
  );
}

export default App;