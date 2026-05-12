import { useEffect, useState } from "react";

import { useAuth } from "../context/useAuth";
import { getWeeklyPlan, removeRecipeFromWeeklyPlan } from "../services/weeklyPlan.service";

import "./WeeklyPlanPage.css";

// Objeto para traducir los días del backend al texto que ve el usuario
const days = {
    monday: "Lunes",
    tuesday: "Martes",
    wednesday: "Miércoles",
    thursday: "Jueves",
    friday: "Viernes",
    saturday: "Sábado",
    sunday: "Domingo",
};
// Objeto para traducir los tipos de comida
const mealTypes = {
    breakfast: "Desayuno",
    lunch: "Comida",
    dinner: "Cena",
    snack: "Snack",
};

const WeeklyPlanPage = () => {
    const { token } = useAuth();

    const [plan, setPlan] = useState([]); // Guardas el plan semanal
    const [error, setError] = useState("");

    // Función que carga el plan semanal desde el backend
    const loadWeeklyPlan = async () => {
        try {
            setError("");

            const data = await getWeeklyPlan(token);// Llamo al backend enviando el token

            setPlan(data.plan); // Guardo el plan recibido en el estado
        } catch (error) {
            setError("Error al cargar el plan semanal");
        }
    };

    useEffect(() => {
        if (token) {
            loadWeeklyPlan();
        }
    }, [token]);

    const handleRemove = async (planItemId) => {
        try {
            await removeRecipeFromWeeklyPlan(planItemId, token);

            setPlan(plan.filter((item) => item.id !== planItemId)); 
        } catch (error) {
            alert("Error al eliminar receta del plan");
        }
    };

    const handleRemove = async (planItemId) => {
        const confirmDelete = window.confirm(
            "¿Estás seguro de que quieres eliminar esta receta del plan semanal?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            await removeRecipeFromWeeklyPlan(planItemId, token);

            // Quédate solo con los items cuyo id NO sea igual al que quiero eliminar
            setPlan(plan.filter((item) => item.id !== planItemId)); // Actualiza el estado (plan) quitando de pantalla el item eliminado . filter crea un nuevo array con todos menos el eliminado

            alert("Receta eliminada del plan semanal");
        } catch (error) {
            alert("Error al eliminar receta del plan");
        }
    };

    return (
        <main className="weekly-plan-page">
            <h1>Plan semanal</h1>

            {error && <p>{error}</p>}
            {/*Convertimos el objeto en array -> Object.entries(days) recorres todos y crea JSX por cada uno */}
            {Object.entries(days).map(([dayKey, dayLabel]) => (
                <section key={dayKey} className="weekly-day-card">
                    <h2>{dayLabel}</h2>

                    {Object.entries(mealTypes).map(([mealKey, mealLabel]) => {
                        // Busca las recetas que correspondan a ese día y esa comida
                        const items = plan.filter(
                            (item) => item.day === dayKey && item.mealType === mealKey
                        );

                        return (
                            <div key={mealKey} className="meal-block">
                                <h3>{mealLabel}</h3>

                                {items.length === 0 ? (
                                    <p>Sin receta asignada</p>
                                ) : (
                                    items.map((item) => (
                                        <article key={item.id} className="plan-recipe-card">
                                            <h4>{item.recipe?.title}</h4>
                                            <p>{item.recipe?.calories} kcal</p>

                                            <button onClick={() => handleRemove(item.id)}>
                                                Eliminar
                                            </button>
                                        </article>
                                    ))
                                )}
                            </div>
                        );
                    })}
                </section>
            ))}
        </main>
    );
};

export default WeeklyPlanPage;