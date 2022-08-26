import React, {useState} from 'react';
import axios from "axios";
import courses from "../../helpers/data/courses";
import cookingTimes from "../../helpers/data/cookingTimes";
import {useForm} from "react-hook-form";
import IntroBlock from "../../components/IntroBlock/IntroBlock";
import GetRecipe from "../../components/GetRecipe/GetRecipe";
import "./SearchMyFridge.css";
import Button from "../../components/Button/Button";

function SearchMyFridge() {
    const {register, handleSubmit} = useForm();
    const [recipes, setRecipes] = useState(null);
    const [foundRecipes, setFoundRecipes] = useState(null);
    const [offsetNext, setOffsetNext] = useState(null);
    const [offsetPrevious, setOffsetPrevious] = useState(null);

    async function onFormSubmit(data) {
        try {
            const recipes = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${data.searchQuery}&type=${data.course}&maxReadyTime=${data.maxPrepTime}&addRecipeInformation=true`);
            setRecipes(recipes.data.results);
            setFoundRecipes(recipes.data);
            setOffsetNext(recipes.data.offset + recipes.data.number);
        } catch (e) {
            console.error(e);
        }
    }

    async function getNextRecipes() {
        try {
            const recipe = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&addRecipeInformation=true&offset=${offsetNext}`);
            setRecipes(recipe.data.results);
            setFoundRecipes(recipe.data);
            setOffsetNext(recipe.data.offset + recipe.data.number);
            setOffsetPrevious(recipe.data.offset - recipe.data.number);
        } catch (e) {
            console.error(e);
        }
    }

    async function getPreviousRecipes() {
        try {
            const recipe = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&addRecipeInformation=true&offset=${offsetPrevious}`);
            setRecipes(recipe.data.results);
            setFoundRecipes(recipe.data);
            setOffsetNext(recipe.data.offset + recipe.data.number);
            setOffsetPrevious(recipe.data.offset - recipe.data.number);
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <>
            <main>
                <section>
                    <IntroBlock
                        pageTitle="Search your fridge"
                        information="Ever wondered what recipes you can cook with the ingredients you have in your fridge or pantry? Find
                    recipes that use as many of the given ingredients as possible and require as few additional
                    ingredients as possible."
                    />
                </section>

                <section className="search-fridge">
                    <p>You can include ingredients to find the recipes you are looking for. Want to involve multiple
                        ingredients? You can also select a dish type
                        and time limit to further specify the results.</p>

                    <form onSubmit={handleSubmit(onFormSubmit)} className="search-fridge-form">

                        <div className="search-fridge-form-label">
                            <label htmlFor="searchQuery">Ingredients
                                <input
                                    type="text"
                                    id="searchQuery"
                                    {...register("searchQuery")}
                                    placeholder="Ingredients"
                                />
                            </label>

                            <label htmlFor="course">Course
                                <select name="course" id="course" {...register("course")}>
                                    <option value="">All courses</option>
                                    {courses.map((course) => {
                                        return (
                                            <option value={course} key={course}>{course}</option>
                                        )
                                    })}
                                </select>
                            </label>

                            <label htmlFor="maxPrepTime">Maximum preparation time
                                <select
                                    name="maxPrepTime" id="maxPrepTime" {...register("maxPrepTime")}>
                                    <option value="9999">No preference</option>
                                    {cookingTimes.map((cookingTime) => {
                                        return (
                                            <option value={cookingTime} key={cookingTime}>{cookingTime}</option>
                                        )
                                    })}
                                </select>
                            </label>
                        </div>

                        <Button
                            type="submit"
                            buttonText="Search recipes"
                        />

                    </form>
                </section>

                <section>
                    {recipes &&
                        <h2>Found {foundRecipes.totalResults} recipes</h2>
                    }
                </section>

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
            </main>
        </>
    )
        ;
}

export default SearchMyFridge;