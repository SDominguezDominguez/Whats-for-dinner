import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import axios from "axios";
import {Link} from "react-router-dom";

function SearchMyFridge() {
    const {register, handleSubmit} = useForm();
    const [recipes, setRecipes] = useState(null);

    async function onFormSubmit(data) {
        try {
            const recipes = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${data.searchQuery}&type=${data.course}&maxReadyTime=${data.maxPrepTime}&addRecipeInformation=true`);
            console.log(recipes);
            setRecipes(recipes.data);
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <>
            <main>
                <h2>Search your fridge</h2>
                <p>Ever wondered what recipes you can cook with the ingredients you have in your fridge or pantry? Find
                    recipes that use as many of the given ingredients as possible and require as few additional
                    ingredients as possible. </p>
                <p>You can include ingredients to find the recipes you are looking for. Want to involve multiple
                    ingredients? You can also select a dish type
                    and time limit to further specify the results.</p>
                <form onSubmit={handleSubmit(onFormSubmit)}>
                    <label htmlFor="searchQuery">
                        <input type="text" id="searchQuery" {...register("searchQuery")}/>
                    </label>

                    <label htmlFor="course">
                        <select name="course" id="course" {...register("course")}>
                            <option value="">All courses</option>
                            <option value="main course">Dinner</option>
                            <option value="side-dish">Side dish</option>
                            <option value="appetizer">Appetizer</option>
                            <option value="salad">Salad</option>
                            <option value="bread">Bread</option>
                            <option value="breakfast">Breakfast</option>
                            <option value="dessert">Dessert</option>
                            <option value="soup">Soup</option>
                            <option value="beverage">Beverage</option>
                            <option value="sauce">Sauce</option>
                            <option value="marinade">Marinade</option>
                            <option value="fingerfood">Fingerfood</option>
                            <option value="snack">Snack</option>
                            <option value="drink">Drink</option>
                        </select>
                    </label>
                    <label htmlFor="maxPrepTime">
                        Maximum preparation time
                        <select
                            name="maxPrepTime" id="maxPrepTime" {...register("maxPrepTime")}>
                            <option value="9999">No preference</option>
                            <option value="15">15 minutes</option>
                            <option value="30">30 minutes</option>
                            <option value="45">45 minutes</option>
                            <option value="60">60 minutes</option>
                            <option value="90">90 minutes</option>
                            <option value="120">120 minutes</option>
                        </select>
                    </label>
                    <button type="submit">Search recipes</button>
                </form>

                <section>
                    {recipes &&
                        <h2>Found {recipes.totalResults} recipes</h2>
                    }
                    {recipes && recipes.results.map((recipe) => {
                        return (
                            <Link to={`/recipe/${recipe.id}`} key={recipe.id}>
                                <article key={recipe.title}>
                                    <h4>{recipe.title}</h4>
                                    <img src={recipe.image} alt={recipe.title}/>
                                    <ul>
                                        <li>🕓{recipe.readyInMinutes} min</li>
                                        <li>👤 {recipe.servings} servings</li>
                                        {recipe.veryPopular === true &&
                                            <li>❤ Popular recipe</li>
                                        }
                                    </ul>
                                </article>
                            </Link>
                        )
                    })}

                    {/*<button type="previous">Previous</button>*/}
                    {/*<button type="next">Next</button>*/}
                </section>
            </main>
        </>
    )
        ;
}

export default SearchMyFridge;