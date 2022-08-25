import React, {useEffect, useState} from 'react';
import axios from "axios";
import IntroBlock from "../../components/IntroBlock/IntroBlock";
import GetRecipe from "../../components/GetRecipe/GetRecipe";
import Button from "../../components/Button/Button";
import "./RecipeOverview.css";

function RecipeOverview() {
    const [recipes, setRecipes] = useState(null);
    const [foundRecipes, setFoundRecipes] = useState(null);
    const [offsetNext, setOffsetNext] = useState(null);
    const [offsetPrevious, setOffsetPrevious] = useState(null);

    useEffect(() => {
        async function getRecipes() {
            try {
                const recipe = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&addRecipeInformation=true&number=25`);
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
            setRecipes(recipes.data.results);
            setFoundRecipes(recipes.data);
            setOffsetNext(recipes.data.offset + recipes.data.number);
            setOffsetPrevious(recipes.data.offset - recipes.data.number);
        } catch (e) {
            console.error(e);
        }
    }

    async function getPreviousRecipes() {
        try {
            const recipes = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&addRecipeInformation=true&offset=${offsetPrevious}`);
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
            <main>
                <section>
                    <IntroBlock
                        pageTitle="Recipes"
                        information="Browse through all our recipes"
                    />
                </section>

                <section className="recipes">
                    <GetRecipe recipeType={recipes}/>
                </section>

                <section className="overview-buttons">
                    {recipes && foundRecipes.offset > 0 &&
                        <Button
                            type="button"
                            onClickHandler={getPreviousRecipes}
                            buttonText="Previous"
                        />
                    }

                    {recipes && foundRecipes.offset < foundRecipes.totalResults &&
                        <>
                            <Button
                                type="button"
                                onClickHandler={getNextRecipes}
                                buttonText="Next"
                            />
                        </>
                    }
                </section>

            </main>
        </>
    );
}

export default RecipeOverview;
