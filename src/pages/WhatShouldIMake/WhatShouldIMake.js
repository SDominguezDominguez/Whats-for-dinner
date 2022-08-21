import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {useForm} from "react-hook-form";
import axios from "axios";
import IntroBlock from "../../components/IntroBlock/IntroBlock";

function WhatShouldIMake() {
    const {register, handleSubmit} = useForm();
    const [recipes, setRecipes] = useState(null);

    async function onFormSubmit(data) {
        console.log(data);

        try {
            const recipe = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&type=${data.course}&cuisine=${data.cuisine}&diet=${data.dietRestriction}&intolerances=${data.intolerances}&addRecipeInformation=true&sort=random&number=3`);
            console.log(recipe);
            setRecipes(recipe.data.results);
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <>
            <main>
                <IntroBlock
                    pageTitle="What should I make?"
                    information="On occasion we all have a hard time to decide what we should eat. With 3 meals a day and 365 days
                        a year that's not a surprise.
                        So let us help you decide what to eat for your next meal. No matter if it's for breakfast,
                        lunch, dinner or maybe just a snack your looking for, we got a lot of different recipes.
                        You can let us pick a random recipe, based on some preferences"
                >
                    <p>Rather browse through all of our recipes? <Link
                        to={"/recipe-overview"}
                    >Search all our recipes here.</Link></p>
                </IntroBlock>

                <section>
                    <h2>Give me a recipe</h2>
                    <form onSubmit={handleSubmit(onFormSubmit)}>
                        <label htmlFor="course">
                            For which course would you like a recipe?
                            <select name="course" id="course" {...register("course")}>
                                <option value="">All courses</option>
                                <option value="main-course">Dinner</option>
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
                        <label htmlFor="cuisine">
                            Cuisine:
                            <select name="cuisine-preference" id="cuisine" {...register("cuisine")}>
                                <option value="">All cuisines</option>
                                <option value="african">African</option>
                                <option value="american">American</option>
                                <option value="british">British</option>
                                <option value="chinese">Chinese</option>
                                <option value="european">European</option>
                                <option value="french">French</option>
                                <option value="greek">Greek</option>
                                <option value="indian">Indian</option>
                                <option value="italian">Italian</option>
                                <option value="japanese">Japanese</option>
                                <option value="mediterranean">Mediterranean</option>
                                <option value="mexican">Mexican</option>
                                <option value="spanish">Spanish</option>
                                <option value="thai">Thai</option>
                                <option value="vietnamese">Vietnamese</option>
                            </select>
                        </label>

                        <label htmlFor="diet-restriction">
                            Do you have any diet restrictions?
                            <select name="dietRestriction" id="diet-restriction" {...register("dietRestriction")}>
                                <option value="">No diet restrictions</option>
                                <option value="gluten-free">Gluten free</option>
                                <option value="ketogenic">Keto</option>
                                <option value="vegetarian">Vegetarian</option>
                                <option value="vegan">Vegan</option>
                                <option value="pescetarian">Pescetarian</option>
                                <option value="paleo">Paleo</option>
                            </select>
                        </label>

                        <label htmlFor="intolerances">
                            Do you have any intolerances?
                            <select name="intolerances" id="intolerances" {...register("intolerances")}>
                                <option value="">No intolerances</option>
                                <option value="dairy">Dairy</option>
                                <option value="egg">Egg</option>
                                <option value="gluten">Gluten</option>
                                <option value="grain">Grain</option>
                                <option value="peanut">Peanuts</option>
                                <option value="seafood">Seafood</option>
                                <option value="shellfish">Shellfish</option>
                            </select>
                        </label>

                        <button type="submit">Get my recipe</button>
                    </form>
                </section>
                <article>
                    <h2>Recipes</h2>
                    {recipes && recipes.map((recipe) => {
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
                </article>
            </main>
        </>
    );
}

export default WhatShouldIMake;