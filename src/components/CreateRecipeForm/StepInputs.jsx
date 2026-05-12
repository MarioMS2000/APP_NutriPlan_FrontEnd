const StepInputs = ({
    steps,
    handleStepChange,
    addStep,
    removeStep,
}) => {
    return (
        <section>
            <h3>Pasos</h3>
            {/* placeholder={`Paso ${index + 1}`} -> Recorre los pasos y pinta un input por cada paso. Paso 1 Paso 2 Paso 3 */}
            {steps.map((step, index) => (
                <div key={index}>
                    <input
                        type="text"
                        placeholder={`Paso ${index + 1}`}
                        value={step}
                        onChange={(e) =>
                            handleStepChange(index, e)
                        }
                    />

                    {steps.length > 1 && (
                        <button
                            type="button"
                            onClick={() => removeStep(index)}
                        >
                            Eliminar paso
                        </button>
                    )}
                </div>
            ))}

            <button type="button" onClick={addStep}>
                Añadir paso
            </button>
        </section>
    );
};

export default StepInputs;