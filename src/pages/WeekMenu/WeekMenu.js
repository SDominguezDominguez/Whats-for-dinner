import React, {useEffect, useState} from 'react';
import axios from "axios";
import IntroBlock from "../../components/IntroBlock/IntroBlock";
import GetRecipe from "../../components/GetRecipe/GetRecipe";
import "./WeekMenu.css";

function WeekMenu() {
    const [recipes, setRecipes] = useState(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        async function getWeekMenu() {
            setError(false);
            setLoading(true);

            try {
                const recipes = await axios.get(`https://api.spoonacular.com/recipes/informationBulk?apiKey=${process.env.REACT_APP_API_KEY}&ids=715538,716429,641842,640803,657556,631748,715495`);
                setRecipes(recipes.data);
                console.log(recipes);
            } catch (e) {
                setError(true);
                console.error(e);
            }
            setLoading(false);
        }

        getWeekMenu();
    }, []);

    return (
        <>
            <main>

                <section>
                    <IntroBlock
                        pageTitle="Try our week menu"
                        information="Here you can find our weekmenu"
                    />
                </section>

                <section className="recipes">
                    {error && <span className="error">Something went wrong while retrieving the data</span>}
                    {loading && <span className="loading">Loading...</span>}
                    <GetRecipe recipeType={recipes}/>
                </section>

            </main>
        </>
    );
}

export default WeekMenu;