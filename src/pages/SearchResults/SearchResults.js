import React, {useContext, useEffect, useState} from 'react';
import {SearchContext} from "../../context/SearchContext";
import GetRecipe from "../../components/GetRecipe/GetRecipe";

function SearchResults() {
    const {recipes} = useContext(SearchContext);
    const [searchResults, setSearchResults] = useState(null);

    useEffect(() => {
        setSearchResults(recipes.recipes.results);
    }, []);

    return (
        <>
            <main>
                <h2>Search results for {recipes.query}</h2>

                <section className="recipes">
                    <GetRecipe recipeType={searchResults}/>
                </section>

            </main>
        </>
    )
        ;
}

export default SearchResults;