import React, {useEffect, useState} from 'react';
import axios from "axios";
import IntroBlock from "../../components/IntroBlock/IntroBlock";
import GetRecipe from "../../components/GetRecipe/GetRecipe";

function RecipeOverview() {
    const [recipes, setRecipes] = useState(null);
    const [foundRecipes, setFoundRecipes] = useState(null);
    const [offsetNext, setOffsetNext] = useState(null);
    const [offsetPrevious, setOffsetPrevious] = useState(null);

    useEffect(() => {
        async function getRecipes() {
            try {
                const recipe = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&addRecipeInformation=true`);
                console.log(recipe);
                setFoundRecipes(recipe.data);
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
            const recipes = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&addRecipeInformation=true&offset=${offsetNext}`);
            console.log(recipes);
            setRecipes(recipes.data.results);
            setFoundRecipes(recipes.data);
            setOffsetNext(recipes.data.offset + recipes.data.number);
            setOffsetPrevious(recipes.data.offset - recipes.data.number);
            console.log(offsetNext);
        } catch (e) {
            console.error(e);
        }
    }

    async function getPreviousRecipes() {
        try {
            const recipes = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&addRecipeInformation=true&offset=${offsetPrevious}`);
            console.log(recipes);
            setRecipes(recipes.data.results);
            setFoundRecipes(recipes.data);
            setOffsetNext(recipes.data.offset + recipes.data.number);
            setOffsetPrevious(recipes.data.offset - recipes.data.number);
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
            <section className="recipes">
                <GetRecipe recipeType={recipes}/>
            </section>
            <section className="button">
                {recipes && foundRecipes.offset > 0 &&
                    <button type="previous" onClick={getPreviousRecipes}>Previous</button>
                }
                {recipes &&
                    <>
                        <button type="next" onClick={getNextRecipes}>Next</button>
                    </>
                }
            </section>
        </>
    );
}

export default RecipeOverview;