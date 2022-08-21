import React from 'react';
import {Link} from "react-router-dom";

function GetRecipe({recipeType, children}) {
    return (
        <>
            {recipeType && recipeType.map((recipes) => {
                return (
                    <article key={recipes.title}>
                        <Link to={`/recipe/${recipes.id}`}>
                            <img src={recipes.image} alt="recipe"/>
                            <h4>{recipes.title}</h4>
                            <ul>
                                <li>🕓{recipes.readyInMinutes} min</li>
                                <li>👤 {recipes.servings} servings</li>
                                {recipes.veryPopular === true &&
                                    <li>❤ Popular recipe</li>
                                }
                            </ul>
                        </Link>
                        {children}
                    </article>
                )
            })}
        </>
    );
}

export default GetRecipe;