import React, {useContext} from 'react';
import axios from "axios";
import {useForm} from "react-hook-form";
import {AuthContext} from "../../context/AuthContext";
import IntroBlock from "../../components/IntroBlock/IntroBlock";
import Button from "../../components/Button/Button";

function Profile() {
    const {register, handleSubmit} = useForm();
    const {user: {email, username}} = useContext(AuthContext);
    const token = localStorage.getItem("token");

    async function onFormSubmit(data) {

        try {
            const changePassword = await axios.put("https://frontend-educational-backend.herokuapp.com/api/user", {
                "password": data.password,
                "repeatedPassword": data.repeatedPassword,
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <>
            <main>
                <section>
                    <IntroBlock
                        pageTitle="Profile information"
                        information="Here you can find your username and e-mailadres. Want to change your e-mail or password? You can do that here!"
                    />
                </section>

                <section>
                    <h2>Gegevens</h2>
                    <p>Gebruikersnaam: {username}</p>
                    <p>E-mailadres: {email}</p>
                </section>

                <section className="sign-in-form">
                    <h2>Wachtwoord wijzigen</h2>
                    <form onSubmit={handleSubmit(onFormSubmit)}>
                        <label htmlFor="new-password-field">
                            Nieuw wachtwoord:
                            <input
                                type="password"
                                id="new-password-field"
                                {...register("password")}
                            />
                        </label>
                        <label htmlFor="repeated-password-field">
                            Herhaal wachtwoord:
                            <input
                                type="password"
                                id="repeated-password-field"
                                {...register("repeatedPassword")}
                            />
                        </label>
                        <Button
                            type="submit"
                            buttonText="Opslaan"
                        />
                    </form>
                </section>
            </main>
        </>
    );
}

export default Profile;