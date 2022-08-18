import React, {useEffect, useState} from 'react';
import './Home.css'
import SearchBar from "../../components/SearchBar/SearchBar";
import image1 from '../../../../whats-for-dinner/src/assets/funnyImg.jpg'
import axios from "axios";

function Home() {
    const [randomRecipe, setRandomRecipe] = useState(null);
    const [popularRecipes, setPopularRecipes] = useState(null);
    const [quickRecipes, setQuickRecipes] = useState(null)

    async function getRandomRecipe() {
        try {
            const recipe = await axios.get(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&tags="main course"&number=1`);
            console.log(recipe);
            setRandomRecipe(recipe.data.recipes[0]);
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        async function getPopularRecipes() {
            try {
                const popularRecipe = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&type="main course"&sort=popularity&number=10`);
                // console.log(popularRecipe.data.results);
                setPopularRecipes(popularRecipe.data.results);
            } catch (e) {
                console.error(e);
            }
        }

        async function getQuickRecipes() {
            try {
                const quickRecipe = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&type="main course"&sort=time&number=10`);
                console.log(quickRecipe.data.results);
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
                <section>
                    <article className="random-recipe-intro">
                        <img src={image1} alt="funny what's for dinner"/>
                        <p>
                            It's the most frequently asked question: "What's for dinner tonight?"
                            Do you know what's for dinner today?
                            Don't worry, we are happy to help you. Let us choose a random recipe for you!
                        </p>
                        <button type="button" onClick={getRandomRecipe}>Get a random recipe</button>
                    </article>
                    <article className="random-recipe">
                        {randomRecipe &&
                            <>
                                <h1>{randomRecipe.title}</h1>
                                <img src={randomRecipe.image} alt="recipe"/>
                                <p>Cooking time: {randomRecipe.readyInMinutes} minutes</p>
                                <button>Make recipe</button>
                            </>
                        }
                    </article>
                </section>
                <section>
                    <h2>Popular recipes</h2>
                    {popularRecipes && popularRecipes.map((popularRecipe) => {
                        return (
                            <article key={popularRecipe.title}>
                                <h4>{popularRecipe.title}</h4>
                                <img src={popularRecipe.image} alt="recipe"/>
                            </article>
                        )
                    })}
                </section>
                <section>
                    <h2>Quick recipes</h2>
                    {quickRecipes && quickRecipes.map((quickRecipe) => {
                        return (
                            <article key={quickRecipe.title}>
                                <h4>{quickRecipe.title}</h4>
                                <img src={quickRecipe.image} alt="recipe"/>
                            </article>
                        )
                    })}
                </section>
            </main>
        </>
    );
}

export default Home;