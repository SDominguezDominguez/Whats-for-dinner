import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar";
import IntroBlock from "../../components/IntroBlock/IntroBlock";
import GetRecipe from "../../components/GetRecipe/GetRecipe";
import Button from "../../components/Button/Button";
import image1 from '../../../../whats-for-dinner/src/assets/funnyImg.jpg'
import './Home.css'
import {set} from "react-hook-form";

function Home() {
    const [randomRecipe, setRandomRecipe] = useState(null);
    const [popularRecipes, setPopularRecipes] = useState(null);
    const [quickRecipes, setQuickRecipes] = useState(null);
    const source = axios.CancelToken.source();
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        return function cleanup() {
            source.cancel();
        }
    }, []);

    async function getRandomRecipe() {
        setError(false);
        setLoading(true);

        try {
            const recipe = await axios.get(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&tags="main course"&number=1`, {
                cancelToken: source.token,
            });
            setRandomRecipe(recipe.data.recipes[0]);
        } catch (e) {
            setError(true);
            console.error(e);
        }
        setLoading(false);
    }

    useEffect(() => {

        async function getPopularRecipes() {
            setError(false);
            setLoading(true);

            try {
                const popularRecipe = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&type="main course"&sort=popularity&number=8&addRecipeInformation=true`, {
                    cancelToken: source.token,
                });
                setPopularRecipes(popularRecipe.data.results);
            } catch (e) {
                setError(true);
                console.error(e);
            }
            setLoading(false);
        }

        async function getQuickRecipes() {
            setError(false);
            setLoading(true);

            try {
                const quickRecipe = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&type="main course"&sort=time&number=8&addRecipeInformation=true&sortDirection=asc`, {
                    cancelToken: source.token,
                });
                setQuickRecipes(quickRecipe.data.results);
            } catch (e) {
                setError(true);
                console.error(e);
            }
            setLoading(false);
        }

        getPopularRecipes();
        getQuickRecipes();
    }, [])

    return (
        <>
            <main>
                <section>
                    <SearchBar
                        styling="searchbar-home"
                        searchText="Find your recipe here"
                    />
                </section>
                <section className="intro-home">
                    <IntroBlock
                        information={`It's the most frequently asked question. Do you know what's for dinner today?
                            Don't worry, we are happy to help you. Let us choose a random recipe for you!`}
                        pageTitle="What's for dinner tonight?"
                    >
                        <img src={image1} alt="funny what's for dinner"/>
                        <Button
                            type="button"
                            onClickHandler={getRandomRecipe}
                            buttonText="Get a random recipe"
                        />
                    </IntroBlock>

                    {error && <span>Er is iets mis gegaan met het ophalen van de data</span>}
                    {loading && <span>Loading...</span>}
                    {randomRecipe &&
                        <>
                            <article className="get-recipes">
                                <h3>{randomRecipe.title}</h3>
                                <img src={randomRecipe.image} alt="recipe"/>
                                <ul>
                                    <li>🕓{randomRecipe.readyInMinutes} min</li>
                                    <li>👤 {randomRecipe.servings} servings</li>
                                </ul>
                                <Link to={`recipe/${randomRecipe.id}`}>
                                    <Button
                                        type="button"
                                        buttonText="Make recipe"
                                    />
                                </Link>
                            </article>
                        </>
                    }
                </section>

                <section className="popular-recipes">
                    <h2>Popular recipes</h2>
                    <div className="recipes">
                        {error && <span>Er is iets mis gegaan met het ophalen van de data</span>}
                        {loading && <span>Loading...</span>}
                        <GetRecipe recipeType={popularRecipes}/>
                    </div>
                </section>

                <section>
                    <h2>Quick recipes</h2>
                    <div className="recipes">
                        {error && <span>Er is iets mis gegaan met het ophalen van de data</span>}
                        {loading && <span>Loading...</span>}
                        <GetRecipe recipeType={quickRecipes}/>
                    </div>
                </section>
            </main>
        </>
    );
}

export default Home;