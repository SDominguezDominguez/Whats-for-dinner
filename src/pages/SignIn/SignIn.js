import React, {useContext, useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";
import {useForm} from "react-hook-form";
import {AuthContext} from "../../context/AuthContext";
import IntroBlock from "../../components/IntroBlock/IntroBlock";
import "./SignIn.css";
import Button from "../../components/Button/Button";

function SignIn() {
    const {login} = useContext(AuthContext);
    const {register, handleSubmit} = useForm();
    const source = axios.CancelToken.source();
    const [error, setError] = useState(false);

    useEffect(() => {
        return function cleanup() {
            source.cancel();
        }
    }, []);

    async function makeLogInRequest(data) {
        setError(false);

        try {
            const response = await axios.post("https://frontend-educational-backend.herokuapp.com/api/auth/signin", {
                username: data.username,
                password: data.password,
            }, {
                cancelToken: source.token,
            });

            login(response.data.accessToken);

        } catch (e) {
            setError(true);
            console.error(e);
        }
    }

    return (
        <>
            <main>

                <section>
                    <IntroBlock
                        pageTitle="Sign in"
                        information="Welcome back!"
                    />
                </section>

                <section className="sign-in-form">
                    <p>Glad you're back. Enter your email address to proceed.</p>

                    <form onSubmit={handleSubmit(makeLogInRequest)}>
                        <label htmlFor="username-field">
                            Username:
                            <input
                                type="text"
                                id="username-field"
                                {...register("username")}
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
                        {error && <span>Combination of email address and password is incorrect</span>}

                        <Button
                            type="submit"
                            buttonText="Sign in"
                        />

                    </form>
                </section>

                <section>
                    <p>Don't have an account yet? Then <Link to="/sign-up">register</Link> first!</p>
                </section>

            </main>
        </>
    );
}

export default SignIn;