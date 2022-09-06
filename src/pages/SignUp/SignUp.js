import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import IntroBlock from "../../components/IntroBlock/IntroBlock";
import Button from "../../components/Button/Button";

function SignUp() {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const source = axios.CancelToken.source();

    useEffect(() => {
        return function cleanup() {
            source.cancel();
        }
    }, []);

    async function handleFormSubmit(data) {
        setError(false);
        setLoading(true);

        try {
            await axios.post("https://frontend-educational-backend.herokuapp.com/api/auth/signup", {
                username: data.username,
                email: data.email,
                password: data.password,
                role: ["user"],
            }, {
                cancelToken: source.token,
            });

            navigate("/sign-in");

        } catch (e) {
            setError(true);
            console.error(e);
        }
        setLoading(false);
    }

    return (
        <>
            <main>

                <section>
                    <IntroBlock
                        pageTitle="Register"
                    />
                </section>

                <section className="sign-in-form">

                    <form onSubmit={handleSubmit(handleFormSubmit)}>
                        <label htmlFor="username-field">
                            Username:
                            <input
                                type="text"
                                id="username-field"
                                {...register("username", {
                                    required: "Username can't be empty",
                                    minLength: {
                                        value: 6,
                                        message: "The username must contain at least 6 characters"
                                    }
                                })}
                            />
                            {errors.username && <span>{errors.username.message}</span>}
                        </label>

                        <label htmlFor="email-field">
                            E-mail:
                            <input
                                type="email"
                                id="email-field"
                                {...register("email", {required: "E-mail can't be empty"})}
                            />
                        </label>

                        <label htmlFor="password-field">
                            Password:
                            <input
                                type="password"
                                id="password-field"
                                {...register("password", {
                                    required: "Password can't be empty",
                                    minLength: {
                                        value: 6,
                                        message: "The password must contain at least 6 characters"
                                    }
                                })}
                            />
                            {errors.password && <span>{errors.password.message}</span>}
                        </label>

                        {error && <span>This account already exists. Try a different email address.</span>}
                        {loading && <span>Loading...</span>}

                        <Button
                            type="submit"
                            buttonText="Register"
                        />

                    </form>
                </section>

                <section>
                    <p>Do you already have an account? You can sign in <Link to="/sign-in">here</Link>.</p>
                </section>

            </main>
        </>
    );
}

export default SignUp;