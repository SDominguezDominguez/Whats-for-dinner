import React, {useEffect, useState} from 'react';
import axios from "axios";
import IntroBlock from "../../components/IntroBlock/IntroBlock";
import GetRecipe from "../../components/GetRecipe/GetRecipe";

function RecipeOverview() {
    const [recipes, setRecipes] = useState(null);
    const [offsetNext, setOffsetNext] = useState(null);
    const [offsetPrevious, setOffsetPrevious] = useState(null);

    useEffect(() => {
        async function getRecipes() {
            try {
                const recipe = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&addRecipeInformation=true`);
                console.log(recipe);
                setRecipes(recipe.data.results);
                setOffsetNext(recipe.data.offset + recipe.data.number);
            } catch (e) {
                console.error(e);
            }
        }

        getRecipes();

    }, []);

    async function getNextRecipes() {
        try {
            const recipe = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&addRecipeInformation=true&offset=${offsetNext}`);
            console.log(recipe);
            setRecipes(recipe.data.results);
            setOffsetNext(recipe.data.offset + recipe.data.number);
            setOffsetPrevious(recipe.data.offset - recipe.data.number);
            console.log(offsetNext);
        } catch (e) {
            console.error(e);
        }
    }

    async function getPreviousRecipes() {
        try {
            const recipe = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&addRecipeInformation=true&offset=${offsetPrevious}`);
            console.log(recipe);
            setRecipes(recipe.data.results);
            setOffsetNext(recipe.data.offset + recipe.data.number);
            setOffsetPrevious(recipe.data.offset - recipe.data.number);
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <>
            <IntroBlock
                pageTitle="Recipes"
                information="Browse through all our recipes"
            />

            <GetRecipe recipeType={recipes} />

            <button type="button" onClick={getPreviousRecipes}>Previous</button>
            <button type="button" onClick={getNextRecipes}>Next</button>
        </>
    );
}

export default RecipeOverview;