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
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const source = axios.CancelToken.source();

    useEffect(() => {
        return function cleanup() {
            source.cancel();
        }
    }, []);

    useEffect(() => {
        async function getRecipes() {
            setError(false);
            setLoading(true);

            try {
                const recipe = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&addRecipeInformation=true&number=25`, {
                    cancelToken: source.token,
                });
                setFoundRecipes(recipe.data);
                setRecipes(recipe.data.results);
                setOffsetNext(recipe.data.offset + recipe.data.number);
            } catch (e) {
                setError(true);
                console.error(e);
            }
            setLoading(false);
        }

        getRecipes();

    }, []);

    async function getNextRecipes() {
        setError(false);
        setLoading(true);

        try {
            const recipes = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&addRecipeInformation=true&offset=${offsetNext}`, {
                cancelToken: source.token,
            });
            setRecipes(recipes.data.results);
            setFoundRecipes(recipes.data);
            setOffsetNext(recipes.data.offset + recipes.data.number);
            setOffsetPrevious(recipes.data.offset - recipes.data.number);
        } catch (e) {
            setError(true);
            console.error(e);
        }
        setLoading(false);
    }

    async function getPreviousRecipes() {
        setError(false);
        setLoading(true);

        try {
            const recipes = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&addRecipeInformation=true&offset=${offsetPrevious}`, {
                cancelToken: source.token,
            });
            setRecipes(recipes.data.results);
            setFoundRecipes(recipes.data);
            setOffsetNext(recipes.data.offset + recipes.data.number);
            setOffsetPrevious(recipes.data.offset - recipes.data.number);
        } catch (e) {
            setError(true);
            console.error(e);
        }
        setLoading(false);
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
                    {error && <span>Er is iets mis gegaan met het ophalen van de data</span>}
                    {loading && <span>Loading...</span>}
                    <GetRecipe recipeType={recipes}/>
                </section>

                <section className="overview-buttons">
                    {error && <span>Er is iets mis gegaan met het ophalen van de data</span>}
                    {loading && <span>Loading...</span>}
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
