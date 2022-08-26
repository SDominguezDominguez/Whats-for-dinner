import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";
import "./RecipeDetail.css";

function RecipeDetail() {
    const {id} = useParams();
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        async function getRecipe() {
            try {
                const recipe = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.REACT_APP_API_KEY}`);
                console.log(recipe);
                setRecipe(recipe.data);
            } catch (e) {
                console.error(e);
            }
        }

        getRecipe();
    }, [])

    return (
        <>
            <main>
                <section className="recipe-head">
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
                        {recipe && recipe.extendedIngredients.map((ingredients) => {
                            return (
                                <li key={ingredients.name}>{ingredients.original}</li>
                            )
                        })}
                    </ul>

                    <ul className="instructions">
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