import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import axios from "axios";
import {Link} from "react-router-dom";

function WeekMenu() {
    const {register, handleSubmit} = useForm();
    const [recipes, setRecipes] = useState(null);

    async function onFormSubmit(data) {
        try {
            const recipes = await axios.get(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&tags="main course"&number=${data.amountOfDays}`);
            console.log(recipes);
            setRecipes(recipes.data.recipes);
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <>
            <main>
                <section>
                    <h2>Make a week menu</h2>
                    <form onSubmit={handleSubmit(onFormSubmit)}>
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
                            <button type="submit">Make week menu</button>
                        </label>
                    </form>
                </section>
                <section>
                    <article>
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
                </section>
            </main>
        </>
    );
}

export default WeekMenu;