import React from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";

function RecipeDetail() {
    const {id} = useParams();

    async function getRecipe() {
        try {
            const recipe = axios.get(`https://api.spoonacular.com/recipes/${id}/ingredientWidget.json?apiKey=${process.env.REACT_APP_API_KEY}`);
            console.log(recipe);
        } catch (e) {
            console.error(e);
        }
    }

    getRecipe();

    return (
        <div>
            Het receptnummer is {id}
        </div>
    );
}

export default RecipeDetail;