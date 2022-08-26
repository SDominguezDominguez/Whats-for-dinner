import React, {useContext, useState} from 'react';
import './SearchBar.css'
import {SearchContext} from "../../context/SearchContext";

function SearchBar({styling, searchText}) {
    const {getSearchQuery} = useContext(SearchContext);
    const [query, setQuery] = useState("");

    let css;

    if (styling === "searchbar-nav") {
        css = "styling-nav"
    } else if (styling === "searchbar-home") {
        css = "searchbar-home"
    } else {
        css = "searchbar-pantry"
    }

    async function searchRequest(e) {
        e.preventDefault();
        getSearchQuery(query);
    }

    return (
        <>
            <form onSubmit={searchRequest} className={css}>
                <input
                    type="text"
                    name="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={searchText}
                />
                <button type="submit">Search</button>
            </form>
        </>
    );
}

export default SearchBar;