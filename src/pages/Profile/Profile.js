import React, {useContext} from 'react';
import {useForm} from "react-hook-form";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import IntroBlock from "../../components/IntroBlock/IntroBlock";

function Profile() {
    const {register, handleSubmit} = useForm();
    const {user: {email, username}} = useContext(AuthContext);
    const token = localStorage.getItem("token");

    async function onFormSubmit(data) {

        try {
            const changePassword = await axios.put("https://frontend-educational-backend.herokuapp.com/api/user", {
                "password": data.password,
                "repeatedPassword": data.repeatedPassword,
            },{
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
        <div>
            <IntroBlock
                pageTitle="Profile information"
                information="Here you can find your username and e-mailadres. Want to change your e-mail or password? You can do that here!"
                />

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
                        Nieuw e-mailadres:
                        <input
                            type="password"
                            id="repeated-password-field"
                            {...register("repeatedPassword")}
                        />
                    </label>
                    <button type="submit">Opslaan</button>
                </form>
            </section>
        </div>
    );
}

export default Profile;