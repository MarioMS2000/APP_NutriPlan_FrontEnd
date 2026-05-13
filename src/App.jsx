import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import RecipesPage from "./pages/RecipesPage";
import ProfilePage from "./pages/ProfilePage";
import ProtectedRoute from "./routes/ProtectedRoute";
import RecipeDetailPage from "./pages/RecipeDetailPage";
import FavoritesPage from "./pages/FavoritesPage";
import Navbar from "./components/Navbar/Navbar";
import WeeklyPlanPage from "./pages/WeeklyPlanPage";
import AdminPage from "./pages/AdminPage";
import EditRecipePage from "./pages/EditRecipePage";
import ProtectedAdminRoute from "./routes/ProtectedAdminRoute";

function App() {
    return (
        <>
            <Navbar />

            <Routes>
                <Route path="/" element={<HomePage />} />

                <Route path="/login" element={<LoginPage />} />

                <Route path="/register" element={<RegisterPage />} />

                <Route path="/recipes" element={<RecipesPage />} />

                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <ProfilePage />
                        </ProtectedRoute>
                    }
                />

                <Route path="/recipes/:id" element={<RecipeDetailPage />} />

                <Route
                    path="/favorites"
                    element={
                        <ProtectedRoute>
                            <FavoritesPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/weekly-plan"
                    element={
                        <ProtectedRoute>
                            <WeeklyPlanPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin"
                    element={
                        <ProtectedAdminRoute>
                            <AdminPage />
                        </ProtectedAdminRoute>
                    }
                />

                <Route
                    path="/admin/recipes/edit/:recipeId"
                    element={
                        <ProtectedAdminRoute>
                            <EditRecipePage />
                        </ProtectedAdminRoute>
                    }
                />
            </Routes>
        </>
    );
}

export default App;