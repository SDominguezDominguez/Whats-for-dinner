import React from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import {useForm} from "react-hook-form";
import IntroBlock from "../../components/IntroBlock/IntroBlock";
import Button from "../../components/Button/Button";

function SignUp() {
    const {register, handleSubmit} = useForm();

    async function handleFormSubmit(data) {

        try {
            const register = await axios.post("https://frontend-educational-backend.herokuapp.com/api/auth/signup", {
                username: data.username,
                email: data.email,
                password: data.password,
                role: ["user"],
            })

        } catch (e) {
            console.error(e);
        }
    }

    return (
        <>
            <main>

                <section>
                    <IntroBlock
                        pageTitle="Register"
                        information="Save your favorite recipes and make your own week menu"
                    />
                </section>

                <section className="sign-in-form">

                    <form onSubmit={handleSubmit(handleFormSubmit)}>
                        <label htmlFor="username-field">
                            Username:
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
                            Password:
                            <input
                                type="password"
                                id="password-field"
                                {...register("password")}
                            />
                        </label>

                        <Button
                            type="submit"
                            buttonText="Register"
                        />

                    </form>
                </section>

                <section>
                    <p>Heb je al een account? Je kunt je <Link to="/sign-in">hier</Link> inloggen.</p>
                </section>

            </main>
        </>
    );
}

export default SignUp;