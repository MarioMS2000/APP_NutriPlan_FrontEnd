const IngredientInputs = ({
    ingredients,
    handleIngredientChange,
    addIngredient,
    removeIngredient,
}) => {
    return (
        <section>
            <h3>Ingredientes</h3>
            {/*Recorre el array y crea inputs automáticamente */}
            {ingredients.map((ingredient, index) => (
                <div key={index}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Ingrediente"
                        value={ingredient.name}
                        onChange={(e) =>
                            handleIngredientChange(index, e)
                        }
                    />

                    <input
                        type="number"
                        name="quantity"
                        placeholder="Cantidad"
                        value={ingredient.quantity}
                        onChange={(e) =>
                            handleIngredientChange(index, e)
                        }
                    />

                    <input
                        type="text"
                        name="unit"
                        placeholder="Unidad"
                        value={ingredient.unit}
                        onChange={(e) =>
                            handleIngredientChange(index, e)
                        }
                    />
                    {/*Solo muestra el botón si hay más de un ingrediente */}
                    {ingredients.length > 1 && (
                        <button
                            type="button"
                            onClick={() => removeIngredient(index)}
                        >
                            Eliminar ingrediente
                        </button>
                    )}
                </div>
            ))}

            <button type="button" onClick={addIngredient}>
                Añadir ingrediente
            </button>
        </section>
    );
};

export default IngredientInputs;