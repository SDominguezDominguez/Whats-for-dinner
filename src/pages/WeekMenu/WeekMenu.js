import React from 'react';

function WeekMenu() {
    return (
        <>
            <main>
                <section>
                    <h2>Make a week menu</h2>
                    <form>
                        <label htmlFor="amount-of-days">
                            Amount of days
                            <select name="amount-of-days" id="amount-of-days">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                            </select>
                            <button type="submit">Make week menu</button>
                        </label>
                    </form>
                </section>
                <section>
                    <article>
                        <h3>recipe information</h3>
                        {/*    Render amount of recipes, chosen by the user. */}
                        <button type="button">Save</button>
                    </article>
                </section>
            </main>
        </>
    );
}

export default WeekMenu;