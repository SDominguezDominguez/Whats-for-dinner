import React, {useContext, useEffect, useState} from 'react';
import {SearchContext} from "../../context/SearchContext";
import GetRecipe from "../../components/GetRecipe/GetRecipe";

function SearchResults() {
    const {recipes} = useContext(SearchContext);
    const [searchResults, setSearchResults] = useState(null);

    console.log(recipes);

    useEffect(() => {
        setSearchResults(recipes.recipes.results);
    }, []);

    return (
        <>
            <main>
                <section className="recipes">
                <GetRecipe recipeType={searchResults} />
                </section>

            </main>
        </>
    )
        ;
}

export default SearchResults;