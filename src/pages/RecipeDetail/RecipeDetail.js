import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";
import "./RecipeDetail.css";

function RecipeDetail() {
    const {id} = useParams();
    const [recipe, setRecipe] = useState(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const source = axios.CancelToken.source();

    useEffect(() => {
        return function cleanup() {
            source.cancel();
        }
    }, []);

    useEffect(() => {
        async function getRecipe() {
            setError(false);
            setLoading(true);

            try {
                const recipe = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.REACT_APP_API_KEY}`, {
                    cancelToken: source.token,
                });
                console.log(recipe);
                setRecipe(recipe.data);
            } catch (e) {
                setError(true);
                console.error(e);
            }
            setLoading(false);
        }

        getRecipe();
    }, [])

    return (
        <>
            <main>
                <section className="recipe-head">
                    {error && <span>Er is iets mis gegaan met het ophalen van de data</span>}
                    {loading && <span>Loading...</span>}
                    {recipe &&
                        <>
                            <h2>{recipe.title}</h2>
                            <img src={recipe.image} alt={recipe.title}/>
                            <ul>
                                <li>Cooking time: {recipe.readyInMinutes}</li>
                                <li>Servings: {recipe.servings}</li>
                            </ul>
                        </>
                    }
                </section>

                <section className="recipe-information">
                    <ul className="ingredients">
                        {error && <span>Er is iets mis gegaan met het ophalen van de data</span>}
                        {loading && <span>Loading...</span>}
                        {recipe && recipe.extendedIngredients.map((ingredients) => {
                            return (
                                <li key={ingredients.name}>{ingredients.original}</li>
                            )
                        })}
                    </ul>

                    <ul className="instructions">
                        {error && <span>Er is iets mis gegaan met het ophalen van de data</span>}
                        {loading && <span>Loading...</span>}
                        {recipe && recipe.analyzedInstructions[0].steps.length > 0 && recipe.analyzedInstructions[0].steps.map((instructions) => {
                            return (
                                <li key={instructions.number}>Step {instructions.number}: {instructions.step}</li>
                            )
                        })}
                    </ul>
                </section>
            </main>
        </>
    );
}

export default RecipeDetail;