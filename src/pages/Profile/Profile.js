import React, {useContext, useState} from 'react';
import axios from "axios";
import {useForm} from "react-hook-form";
import {AuthContext} from "../../context/AuthContext";
import IntroBlock from "../../components/IntroBlock/IntroBlock";
import Button from "../../components/Button/Button";

function Profile() {
    const {register, handleSubmit, formState: {errors}, watch} = useForm();
    const {user: {email, username}} = useContext(AuthContext);
    const token = localStorage.getItem("token");
    const password = watch("password");
    const repeatedPassword = watch("repeatedPassword");
    const [checkedPassword, setCheckedPassword] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [succes, setSucces] = useState(false);

    async function onFormSubmit(data) {
        if (password === repeatedPassword) {
            setLoading(true);
            setError(false);
            setSucces(false);
            setCheckedPassword(false);

            try {
                await axios.put("https://frontend-educational-backend.herokuapp.com/api/user", {
                    "password": data.password,
                    "repeatedPassword": data.repeatedPassword,
                }, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                });
                setSucces(true);
            } catch (e) {
                console.error(e);
                setError(true);
            }
            setLoading(false);
        } else {
            setCheckedPassword(true)
        }
    }

    return (
        <>
            <main>
                <section>
                    <IntroBlock
                        pageTitle="Profile information"
                        information="Here you can find your username and e-mailadres. Want to change your password? You can do that here!"
                    />
                </section>

                <section>
                    <h2>User information</h2>
                    <p>Username: {username}</p>
                    <p>E-mailadres: {email}</p>
                </section>

                <section className="sign-in-form">
                    <h2>Change Password</h2>
                    <form onSubmit={handleSubmit(onFormSubmit)}>
                        <label htmlFor="new-password-field">
                            New password:
                            <input
                                type="password"
                                id="new-password-field"
                                {...register("password", {
                                    required: true,
                                    minLength: {
                                        value: 6,
                                        message: "The password must contain at least 6 characters"
                                    }
                                })}
                            />
                            {errors.password && <span>{errors.password.message}</span>}
                        </label>
                        <label htmlFor="repeated-password-field">
                            Confirm password:
                            <input
                                type="password"
                                id="repeated-password-field"
                                {...register("repeatedPassword")}
                            />
                            {checkedPassword && <span>Your passwords do not match</span>}
                        </label>
                        <Button
                            type="submit"
                            buttonText="Save"
                        />
                        {succes && <span>Your new password is saved</span>}
                    </form>
                    {error && <span className="error">Something went wrong while sending the data</span>}
                    {loading && <span className="loading">Loading...</span>}
                </section>
            </main>
        </>
    );
}

export default Profile;