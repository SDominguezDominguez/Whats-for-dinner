import React from 'react';
import {Link} from "react-router-dom";
import {useForm} from "react-hook-form";
import axios from "axios";

function WhatShouldIMake() {
    const {register, handleSubmit, watch} = useForm();
    const cuisinePreference = watch("cuisinePreference");
    const dietRestrictionsPresent = watch("dietRestrictionsPresent");
    const intolerancesPresent = watch("intolerancesPresent");
    const intolerances = watch("intolerances");

    async function onFormSubmit(data) {
        console.log(data);
        let api = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}`

            try {

                const recipe = await axios.get(`${api}`);
                console.log(recipe);

            } catch (e) {
                console.error(e);
            }
    }

    return (
        <>
            <main>
                <h2>Wat should I make?</h2>
                <article>
                    <p>On occasion we all have a hard time to decide what we should eat. With 3 meals a day and 365 days
                        a year that's not a surprise.
                        So let us help you decide what to eat for your next meal. No matter if it's for breakfast,
                        lunch, dinner or maybe just a snack your looking for, we got a lot of different recipes.
                        You can let us pick a random recipe, based on some preferences or <Link
                            to={"/recipe-overview"}
                        >search all our recipes.</Link>
                    </p>
                </article>
                <section>
                    <h2>Give me a recipe!</h2>
                    <form onSubmit={handleSubmit(onFormSubmit)}>
                        <label htmlFor="course">
                            For which course would you like a recipe?
                            <select name="course" id="course" {...register("course")}>
                                <option value="random">All courses</option>
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
                        <label htmlFor="cuisine-preference">
                            Do you have a cuisine preference?
                            <input
                                {...register("cuisinePreference", {required: true})}
                                type="radio" id="cuisine" name="cuisinePreference" value="no"/> No
                            <input
                                {...register("cuisinePreference", {required: true})}
                                type="radio" id="cuisine" name="cuisinePreference" value="yes"/> Yes

                        </label>
                        {cuisinePreference === "yes" &&
                            <label htmlFor="cuisine">
                                Cuisine:
                                <select name="cuisine-preference" id="cuisine" {...register("cuisine")}>
                                    <option value="random">All cuisines</option>
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
                                    {/*If else function, if there's a recipe, render it, else give a notice to choose another cuisine */}
                                </select>
                                }
                            </label>
                        }

                        <label htmlFor="diet-restrictions-present">
                            Do you have any diet restrictions?
                            <input
                                type="radio" id="diet-restriction-present" name="dietRestrictionsPresent" value="no"
                                {...register("dietRestrictionsPresent", {required: true})}
                            /> No
                            <input
                                {...register("dietRestrictionsPresent", {required: true})}
                                type="radio" id="diet-restriction-present" name="dietRestrictionsPresent" value="yes"
                            /> Yes
                        </label>
                        {dietRestrictionsPresent === "yes" &&
                            <label htmlFor="diet-restriction">
                                Do you have any diet restrictions?
                                <select name="diet-restriction" id="diet-restriction" {...register("dietRestriction")}>
                                    <option value="">No diet restrictions</option>
                                    <option value="gluten-free">Gluten free</option>
                                    <option value="ketogenic">Keto</option>
                                    <option value="vegetarian">Vegetarian</option>
                                    <option value="vegan">Vegan</option>
                                    <option value="pescetarian">Pescetarian</option>
                                    <option value="paleo">Paleo</option>
                                </select>
                            </label>
                        }

                        <label htmlFor="intolerances-present">
                            Do you have any intolerances?
                            <input
                                {...register("intolerancesPresent", {required: true})}
                                type="radio" id="intolerances-present" name="intolerancesPresent" value="no"
                            /> No
                            <input
                                {...register("intolerancesPresent", {required: true})}
                                type="radio" id="intolerances-present" name="intolerancesPresent" value="yes"
                            /> Yes
                        </label>
                        {intolerancesPresent === "yes" &&
                            <>
                                <label htmlFor="intolerances">
                                    What intolerances do you have?
                                    <select name="intolerances" id="intolerances" {...register("intolerances")}>
                                        <option value="dairy">Dairy</option>
                                        <option value="egg">Egg</option>
                                        <option value="gluten">Gluten</option>
                                        <option value="grain">Grain</option>
                                        <option value="peanut">Peanuts</option>
                                        <option value="seafood">Seafood</option>
                                        <option value="shellfish">Shellfish</option>
                                        <option value="other">Other</option>
                                    </select>
                                </label>
                                {intolerances === "other" &&
                                    <input
                                        type="text"
                                        {...register("intolerancesOther")}
                                    />
                                }
                            </>
                        }
                        <button type="submit">Get my recipe</button>
                    </form>
                </section>
                <article>
                    <h2>recipe</h2>
                    {/*render recipe here*/}
                </article>
            </main>
        </>
    );
}

export default WhatShouldIMake;