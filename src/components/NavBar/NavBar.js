import React, {useState} from 'react';
import './NavBar.css'
import logo from "../../../../whats-for-dinner/src/assets/logo.png";
import {Link, NavLink} from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";

function NavBar() {
    const [isAuth, toggleIsAuth] = useState(false);

    return (
        <>
            <header>
                <Link to="/">
                    <img src={logo} alt="Logo"/>
                </Link>
                <div className="header-buttons">
                    {isAuth ?
                        <Link to="/profile">
                            <button type="button">👤</button>
                        </Link>
                        :
                        <Link to="/sign-in">
                            <button type="button">👤</button>
                        </Link>
                    }
                    {isAuth ?
                        <>
                            <Link to="/favorites">
                                <button type="button">❤</button>
                            </Link>
                            <Link to="/">
                                <button type="button" onClick={() => toggleIsAuth(false)}>Sign out</button>
                            </Link>
                        </>
                        :
                        <>
                            <Link to="/sign-in">
                                <button type="button" onClick={() => toggleIsAuth(true)}>Sign in</button>
                            </Link>
                        </>
                    }
                </div>
            </header>
            <nav>
                <ul>
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