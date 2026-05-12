import CreateRecipeForm from "../components/CreateRecipeForm/CreateRecipeForm";
const AdminPage = () => {
    return (
        <main>
            <h1>Panel de administración</h1>
            <p>
                Desde aquí podrás gestionar recetas.
            </p>
            <CreateRecipeForm />
        </main>
    );
};

export default AdminPage;