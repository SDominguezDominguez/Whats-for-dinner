import React, {useState} from 'react';
import axios from "axios";
import {useForm} from "react-hook-form";
import IntroBlock from "../../components/IntroBlock/IntroBlock";
import GetRecipe from "../../components/GetRecipe/GetRecipe";
import "./WeekMenu.css";
import Button from "../../components/Button/Button";

function WeekMenu() {
    const {register, handleSubmit} = useForm();
    const [recipes, setRecipes] = useState(null);

    async function onFormSubmit(data) {
        try {
            const recipes = await axios.get(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&tags="main course"&number=${data.amountOfDays}`);
            setRecipes(recipes.data.recipes);
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <>
            <main>

                <section>
                    <IntroBlock
                        pageTitle="Make a week menu"
                        information="Choose the amount of days you would like a dinner menu for. Our website will make a week menu for you and save it. Want to review your week menu? Just come back to this page."
                    />
                </section>

                <section>
                    <form onSubmit={handleSubmit(onFormSubmit)} className="week-menu-form">

                        <label htmlFor="amount-of-days">
                            Amount of days
                            <select name="amountOfDays" id="amount-of-days" {...register("amountOfDays")}>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                            </select>
                        </label>

                        <Button
                            type="submit"
                            buttonText="Make week menu"
                        />

                    </form>
                </section>

                <section className="recipes">
                    <GetRecipe recipeType={recipes}/>
                </section>

            </main>
        </>
    );
}

export default WeekMenu;