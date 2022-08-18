import './App.css';
import {Navigate, Route, Routes} from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Home from "./pages/Home/Home";
import SearchMyFridge from "./pages/SearchMyFridge/SearchMyFridge";
import WeekMenu from "./pages/WeekMenu/WeekMenu";
import WhatShouldIMake from "./pages/WhatShouldIMake/WhatShouldIMake";
import {useContext} from "react";
import {AuthContext} from "./context/AuthContext";
import Profile from "./pages/Profile/Profile";

function App() {
    const {isAuth} = useContext(AuthContext);

    return (
        <>
            <NavBar/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="search-my-fridge" element={<SearchMyFridge/>}/>
                <Route path="week-menu" element={<WeekMenu/>}/>
                <Route path="what-should-i-make" element={<WhatShouldIMake/>}/>
                <Route
                    path="profile"
                    element={isAuth ? <Profile/> : <Navigate to="sign/in"/>}
                />
            </Routes>
        </>
    )
        ;
}

export default App;
