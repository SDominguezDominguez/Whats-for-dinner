import React, {useContext} from 'react';
import './NavBar.css'
import logo from "../../../../whats-for-dinner/src/assets/logo.png";
import {Link, NavLink, useNavigate} from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import {AuthContext} from "../../context/AuthContext";

function NavBar() {
    const {isAuth, logout} = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <>
            <header>
                <Link to="/">
                    <img src={logo} alt="Logo"/>
                </Link>
                <div className="header-buttons">
                    <Link to="/profile">
                        <button type="button">👤</button>
                    </Link>
                    {isAuth ?
                        <>
                            <Link to="/favorites">
                                <button type="button">❤</button>
                            </Link>
                            <button
                                type="button"
                                onClick={logout}
                            >Sign out
                            </button>
                        </>
                        :
                        <>
                            <button
                                type="button"
                                onClick={() => navigate("/sign-in")}
                            >Sign in
                            </button>
                        </>
                    }
                </div>
            </header>
            <nav>
                <ul>
                    <NavLink to="/">
                        <li>Home</li>
                    </NavLink>
                    <NavLink to="/what-should-i-make">
                        <li>What should I make?</li>
                    </NavLink>
                    <NavLink to="/search-my-fridge">
                        <li>Search my fridge</li>
                    </NavLink>
                    <NavLink to="/week-menu">
                        <li>Week Menu</li>
                    </NavLink>
                    <NavLink to="/recipes">
                        <li>Recipes</li>
                    </NavLink>

                    <SearchBar
                        styling="searchbar-nav"
                        searchText="Search recipe"
                    />

                </ul>
            </nav>
        </>
    )
        ;
}

export default NavBar;