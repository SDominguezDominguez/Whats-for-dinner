import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";

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
        <div>
            Het receptnummer is {id}
            {recipe &&
                <>
                    <h2>{recipe.title}</h2>
                    <img src={recipe.image} alt={recipe.title}/>
                    <p>Cooking time: {recipe.readyInMinutes}
                        Servings: {recipe.servings}
                    </p>
                </>
            }
            <ul>
                {recipe && recipe.extendedIngredients.map((ingredients) => {
                    return (
                        <li key={ingredients.name}>{ingredients.original}</li>
                    )
                })}
            </ul>
            {/*{recipe.analyzedInstructions[0].steps.length > 0 && recipe.analyzedInstructions[0].steps.map((instructions) => {*/}
            {/*    return (*/}
            {/*        <p>{instructions.step}</p>*/}
            {/*    )*/}
            {/*})}*/}
        </div>
    );
}

export default RecipeDetail;