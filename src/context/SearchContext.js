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
    const source = axios.CancelToken.source();
    const navigate = useNavigate();

    useEffect(() => {
        return function cleanup() {
            source.cancel();
            localStorage.clear();
        }
    }, []);

    useEffect(() => {
        const queryPresent = localStorage.getItem("searchQuery");

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
        navigate("/search-results");
    }

    async function getRecipes() {
        const searchQuery = localStorage.getItem("searchQuery");

        try {
            const fetchRecipes = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${searchQuery}&addRecipeInformation=true`);
            setSearchResults({
                query: searchQuery,
                recipes: fetchRecipes.data,
                status: "done",
            }, {
                cancelToken: source.token,
            });

        } catch (e) {
            setSearchResults({
                ...searchResults,
                status: "error",
            })
            console.error(e);
        }
    }

    window.onbeforeunload = () => {
        localStorage.removeItem('isAuth');
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