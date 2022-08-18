import React, {useState} from 'react';
import axios from "axios";
import './SearchBar.css'

function SearchBar({styling, searchText}) {
    const [query, setQuery] = useState("");

    let css;

    if (styling === "searchbar-nav") {
        css = "styling-nav"
    } else if (styling === "searchbar-home") {
        css = "searchbar-home"
    } else {
        css = "searchbar-pantry"
    }

    async function search(e) {
        e.preventDefault();
        console.log(query);

        try {
            const fetchSearchResult = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${query}`);
            console.log(fetchSearchResult);
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <>
            <form onSubmit={search} className={css}>
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