import './App.css';
import {Route, Routes} from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Home from "./pages/Home/Home";
import SearchMyFridge from "./pages/SearchMyFridge/SearchMyFridge";
import WeekMenu from "./pages/WeekMenu/WeekMenu";
import WhatShouldIMake from "./pages/WhatShouldIMake/WhatShouldIMake";
import {useContext} from "react";
import {AuthContext} from "./context/AuthContext";
import Profile from "./pages/Profile/Profile";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Favorites from "./pages/Favorites/Favorites";
import RecipeOverview from "./pages/RecipeOverview/RecipeOverview";
import RecipeDetail from "./pages/RecipeDetail/RecipeDetail";
import SearchBar from "./components/SearchBar/SearchBar";
import SearchResults from "./pages/SearchResults";

function App() {
    const {isAuth} = useContext(AuthContext);

    return (
        <>
            <NavBar/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/search-my-fridge" element={<SearchMyFridge/>}/>
                <Route path="/week-menu" element={<WeekMenu/>}/>
                <Route path="/what-should-i-make" element={<WhatShouldIMake/>}/>
                <Route
                    path="/profile"
                    element={isAuth ? <Profile/> : <SignIn/>}
                />
                <Route path="/favorites" element={<Favorites/>}/>
                <Route path="/sign-in" element={<SignIn/>}/>
                <Route path="/sign-up" element={<SignUp/>}/>
                <Route path="/recipe-overview" element={<RecipeOverview/>}/>
                <Route path="/recipe/:id" element={<RecipeDetail/>} />
            </Routes>
        </>
    )
        ;
}

export default App;
