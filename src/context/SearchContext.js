import {createContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

export const SearchContext = createContext({});

function SearchContextProvider({children}) {
    const [searchResults, setSearchResults] = useState({
        query: null,
        recipes: null,
        status: "pending",
    });
    const navigate = useNavigate();

    useEffect(() => {
        const queryPresent = localStorage.getItem("searchQuery");
        console.log(queryPresent);
        if (queryPresent) {
            getRecipes();
        } else {
            setSearchResults({
                ...searchResults,
                status: "done",
            });
            navigate("/");
        }
    }, []);

    function getSearchQuery(query) {
        localStorage.setItem("searchQuery", query);
        getRecipes();

        setSearchResults({
            query: query,
            recipes: null,
            status: "pending",
        });
    }

    async function getRecipes() {
        const searchQuery = localStorage.getItem("searchQuery");
        console.log(searchQuery);

        try {
            const fetchRecipes = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${searchQuery}&addRecipeInformation=true`);
            setSearchResults({
                query: searchQuery,
                recipes: fetchRecipes.data,
                status: "done",
            });

            console.log(fetchRecipes);
            navigate("/search-results");

        } catch (e) {
            setSearchResults({
                ...searchResults,
                status: "error",
            })
            console.error(e);
        }
    }

    const searchData = {
        query: searchResults.query,
        recipes: searchResults,
        getSearchQuery: getSearchQuery,
    }

    return (
        <SearchContext.Provider value={searchData}>
            {searchResults.status === "done" ? children : <p>Loading...</p>}
        </SearchContext.Provider>
    )
}

export default SearchContextProvider