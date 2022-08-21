import React, {useContext, useEffect} from 'react';
import {useForm} from "react-hook-form";
import {Link} from "react-router-dom";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import IntroBlock from "../../components/IntroBlock/IntroBlock";

function SignIn() {
    const {login} = useContext(AuthContext);
    const {register, handleSubmit} = useForm();
    // const source = axios.CancelToken.source();

    // useEffect(() => {
    //     return function cleanup() {
    //         source.cancel();
    //     }
    // }, []);

    async function makeLogInRequest(data) {

        try {
            const response = await axios.post("https://frontend-educational-backend.herokuapp.com/api/auth/signin", {
                username: data.username,
                password: data.password,
                // }, {
                //     cancelToken: source.token,
            });

            login(response.data.accessToken);

        } catch
            (e) {
            console.error(e);
        }
    }

    return (
        <>
            <IntroBlock
                pageTitle="Sign in"
                information="Welcome back!"
            />

            <form onSubmit={handleSubmit(makeLogInRequest)}>
                <p>Glad you're back. Enter your email address to proceed.</p>
                <label htmlFor="username-field">
                    Gebruikersnaam:
                    <input
                        type="text"
                        id="username-field"
                        {...register("username")}
                    />
                </label>
                <label htmlFor="password-field">
                    Wachtwoord:
                    <input
                        type="password"
                        id="password-field"
                        {...register("password")}
                    />
                </label>
                <button type="submit">Inloggen</button>
            </form>

            <p>Heb je nog geen account? <Link to="/sign-up">Registreer</Link> je dan eerst!</p>
        </>
    );
}

export default SignIn;