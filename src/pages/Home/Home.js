import React, {useEffect, useState} from 'react';
import './Home.css'
import SearchBar from "../../components/SearchBar/SearchBar";
import image1 from '../../../../whats-for-dinner/src/assets/funnyImg.jpg'
import axios from "axios";
import {Link} from "react-router-dom";
import IntroBlock from "../../components/IntroBlock/IntroBlock";
import GetRecipe from "../../components/GetRecipe/GetRecipe";

function Home() {
    const [randomRecipe, setRandomRecipe] = useState(null);
    const [popularRecipes, setPopularRecipes] = useState(null);
    const [quickRecipes, setQuickRecipes] = useState(null);

    async function getRandomRecipe() {
        try {
            const recipe = await axios.get(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&tags="main course"&number=1`);
            setRandomRecipe(recipe.data.recipes[0]);
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        async function getPopularRecipes() {
            try {
                const popularRecipe = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&type="main course"&sort=popularity&number=10&addRecipeInformation=true`);
                setPopularRecipes(popularRecipe.data.results);
            } catch (e) {
                console.error(e);
            }
        }

        async function getQuickRecipes() {
            try {
                const quickRecipe = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&type="main course"&sort=time&number=10&addRecipeInformation=true`);
                setQuickRecipes(quickRecipe.data.results);
            } catch (e) {
                console.error(e);
            }
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
                        <button type="button" onClick={getRandomRecipe}>Get a random recipe</button>
                    </IntroBlock>

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
                                    <button>Make recipe</button>
                                </Link>
                            </article>
                        </>
                    }
                </section>
                <section>
                    <h2>Popular recipes</h2>
                    <div className="recipes">
                        <GetRecipe recipeType={popularRecipes}/>
                    </div>
                </section>
                <section>
                    <h2>Quick recipes</h2>
                    <div className="recipes">
                        <GetRecipe recipeType={quickRecipes}/>
                    </div>
                </section>
            </main>
        </>
    );
}

export default Home;