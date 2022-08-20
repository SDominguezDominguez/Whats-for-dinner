import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";

function RecipeOverview() {
    const [recipes, setRecipes] = useState(null);
    const [offset, setOffset] = useState(null);

    useEffect(() => {
        async function getRecipes() {
            try {
                const recipe = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&addRecipeInformation=true`);
                console.log(recipe);
                setRecipes(recipe.data);
                setOffset(recipe.data.offset + recipe.data.number);
            } catch (e) {
                console.error(e);
            }
        }

        console.log(offset);
        getRecipes();
    }, []);

    async function getNextRecipes() {
        try {
            const recipe = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&addRecipeInformation=true&offset=${offset}`);
            console.log(recipe);
            setRecipes(recipe.data);
            setOffset(recipe.data.offset + recipe.data.number);
            console.log(offset);
        } catch (e) {
            console.error(e);
        }
    }

    async function getPreviousRecipes() {
        try {
            const recipe = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&addRecipeInformation=true&offset=${offset}`);
            console.log(recipe);
            setRecipes(recipe.data);
            setOffset(recipe.data.offset - recipe.data.number);
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <>
            <h1>Recipes</h1>
            {recipes && recipes.results.map((recipe) => {
                return (
                    <article key={recipe.id}>
                        <Link to={`recipe/${recipe.id}`}>
                            <h2>{recipe.title}</h2>
                            <img src={recipe.image} alt={recipe.title}/>
                            <ul>
                                <li>🕓{recipe.readyInMinutes} min</li>
                                <li>👤 {recipe.servings} servings</li>
                            </ul>
                        </Link>
                    </article>
                )
            })}
            <button type="button" onClick={getPreviousRecipes}>Previous</button>
            <button type="button" onClick={getNextRecipes}>Next</button>
        </>
    );
}

export default RecipeOverview;