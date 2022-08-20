import React from 'react';
import {useForm} from "react-hook-form";
import {Link} from "react-router-dom";
import axios from "axios";

function SignUp() {
    const {register, handleSubmit} = useForm();

    async function handleFormSubmit(data) {
        console.log(data);

        try {
            const register = await axios.post("https://frontend-educational-backend.herokuapp.com/api/auth/signup", {
                username: data.username,
                email: data.email,
                password: data.password,
                role: ["user"],
            })

            console.log(register);

        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div>
            <h1>Registreren</h1>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <label htmlFor="username-field">
                    Gebruikersnaam:
                    <input
                        type="text"
                        id="username-field"
                        {...register("username")}
                    />
                </label>
                <label htmlFor="email-field">
                    E-mail:
                    <input
                        type="email"
                        id="email-field"
                        {...register("email")}
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
                <button type="submit">Registreer</button>
            </form>

            <p>Heb je al een account? Je kunt je <Link to="/sign-in">hier</Link> inloggen.</p>
        </div>
    );
}

export default SignUp;