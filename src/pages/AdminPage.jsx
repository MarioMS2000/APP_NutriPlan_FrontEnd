import CreateRecipeForm from "../components/CreateRecipeForm/CreateRecipeForm";
import AdminRecipeList from "../components/AdminRecipeList/AdminRecipeList";

import "./AdminPage.css";

const AdminPage = () => {
    return (
        <main className="admin-page">
            <header className="admin-header">
                <h1>Panel de administración</h1>
                <p>Gestiona las recetas de la aplicación.</p>
            </header>

            <section className="admin-section">
                <h2>Crear nueva receta</h2>
                <CreateRecipeForm />
            </section>

            <section className="admin-section">
                <AdminRecipeList />
            </section>
        </main>
    );
};

export default AdminPage;