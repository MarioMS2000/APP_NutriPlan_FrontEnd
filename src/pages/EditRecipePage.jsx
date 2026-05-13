import EditRecipeForm from "../components/EditRecipeForm/EditRecipeForm";

import "./EditRecipePage.css";

const EditRecipePage = () => {
    return (
        <main className="edit-recipe-page">
            <section className="edit-recipe-container">
                <h1>Editar receta</h1>

                <EditRecipeForm />
            </section>
        </main>
    );
};

export default EditRecipePage;