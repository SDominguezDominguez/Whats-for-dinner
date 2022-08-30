import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {useForm} from "react-hook-form";
import axios from "axios";
import IntroBlock from "../../components/IntroBlock/IntroBlock";
import GetRecipe from "../../components/GetRecipe/GetRecipe";
import Button from "../../components/Button/Button";
import courses from "../../helpers/data/courses";
import cuisines from "../../helpers/data/cuisines";
import dietRestrictions from "../../helpers/data/dietRestrictions";
import intolerances from "../../helpers/data/intolerances";
import "./WhatShouldIMake.css";

function WhatShouldIMake() {
    const {register, handleSubmit} = useForm();
    const [recipes, setRecipes] = useState(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    async function onFormSubmit(data) {
        setError(false);
        setLoading(true);

        try {
            const recipe = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&type=${data.course}&cuisine=${data.cuisine}&diet=${data.dietRestriction}&intolerances=${data.intolerances}&addRecipeInformation=true&sort=random&number=3`);
            setRecipes(recipe.data.results);
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
                        pageTitle="What should I make?"
                        information="On occasion we all have a hard time to decide what we should eat. With 3 meals a day and 365 days
                        a year that's not a surprise.
                        So let us help you decide what to eat for your next meal. No matter if it's for breakfast,
                        lunch, dinner or maybe just a snack your looking for, we got a lot of different recipes.
                        You can let us pick a random recipe, based on some preferences"
                    />

                    <p>Rather browse through all of our recipes? <Link
                        to={"/recipe-overview"}
                    >Search all our recipes here.</Link></p>
                </section>

                <section className="what-to-make">
                    <h2>Give me a recipe</h2>

                    <form onSubmit={handleSubmit(onFormSubmit)} className="what-to-make-form">

                        <div className="what-to-make-label">
                            <label htmlFor="course">For which course would you like a recipe?
                                <select name="course" id="course" {...register("course")}>
                                    <option value="">All courses</option>
                                    {courses.map((course) => {
                                        return (
                                            <option value={course} key={course}>{course}</option>
                                        )
                                    })}
                                </select>
                            </label>

                            <label htmlFor="cuisine">Cuisine:
                                <select name="cuisine-preference" id="cuisine" {...register("cuisine")}>
                                    <option value="">All cuisines</option>
                                    {cuisines.map((cuisine) => {
                                        return (
                                            <option value={cuisine} key={cuisine}>{cuisine}</option>
                                        )
                                    })}
                                </select>
                            </label>

                            <label htmlFor="diet-restriction">Do you have any diet restrictions?
                                <select name="dietRestriction" id="diet-restriction" {...register("dietRestriction")}>
                                    <option value="">No diet restrictions</option>
                                    {dietRestrictions.map((dietRestriction) => {
                                        return (
                                            <option
                                                value={dietRestriction} key={dietRestriction}
                                            >{dietRestriction}</option>
                                        )
                                    })}
                                </select>
                            </label>

                            <label htmlFor="intolerances">Do you have any intolerances?
                                <select name="intolerances" id="intolerances" {...register("intolerances")}>
                                    <option value="">No intolerances</option>
                                    {intolerances.map((intolerance) => {
                                        return (
                                            <option value={intolerance} key={intolerance}>{intolerance}</option>
                                        )
                                    })}
                                </select>
                            </label>
                        </div>

                        <Button
                            type="submit"
                            buttonText="Get my recipe"
                        />

                    </form>
                </section>

                <section className="recipes">
                    {error && <span>Er is iets mis gegaan met het ophalen van de data</span>}
                    {loading && <span>Loading...</span>}
                    <GetRecipe recipeType={recipes}/>
                </section>

            </main>
        </>
    );
}

export default WhatShouldIMake;