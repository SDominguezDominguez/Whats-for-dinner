import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import AuthContextProvider from "./context/AuthContext";
import SearchContextProvider from "./context/SearchContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthContextProvider>
                <SearchContextProvider>
                    <App/>
                </SearchContextProvider>
            </AuthContextProvider>
        </BrowserRouter>
    </React.StrictMode>
);

reportWebVitals();
