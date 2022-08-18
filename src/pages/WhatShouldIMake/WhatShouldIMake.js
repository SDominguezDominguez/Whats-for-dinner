import React from 'react';

function WhatShouldIMake() {
    return (
        <>
            <main>
                <h2>Wat should I make?</h2>
                <article>
                    <p>On occasion we all have a hard time to decide what we should eat. With 3 meals a day and 365 days
                        a year that's not a surprise.
                        So let us help you decide what to eat for your next meal. No matter if it's for breakfast,
                        lunch, dinner or maybe just a snack your looking for, we got a lot of different recipes.
                        You can let us pick a random recipe, based on some preferences or search all our recipes
                        here. {/* add link */}
                    </p>
                </article>
                <section>
                    <h2>Give me a recipe!</h2>
                    <form>
                        <label htmlFor="course">
                            For which meal would you like a recipe?
                            <select name="course" id="course">
                                <option value="random">Random</option>
                                <option value="dinner">Dinner</option>
                                {/*Main course*/}
                                <option value="lunch">Lunch</option>
                                {/*Side dish, salad, bread, soup*/}
                                <option value="breakfast">Breakfast</option>
                                <option value="dessert">Dessert</option>
                                <option value="snack">Snack</option>
                            </select>
                        </label>
                        <label htmlFor="cuisine">
                            Do you have a cuisine preference?
                            <input type="radio" id="cuisine" name="cuisine" value="no"/> No
                            <input type="radio" id="cuisine" name="cuisine" value="yes"/> Yes
                            {/*If checked yes, then also show*/}
                        </label>
                        <label htmlFor="cuisine-preference">
                            <select name="cuisine-preference" id="cuisine-preference">
                                <option value="african">African</option>
                                <option value="american">American</option>
                                <option value="british">British</option>
                                <option value="chinese">Chinese</option>
                                <option value="european">European</option>
                                <option value="french">French</option>
                                <option value="greek">Greek</option>
                                <option value="indian">Indian</option>
                                <option value="italian">Italian</option>
                                <option value="japanese">Japanese</option>
                                <option value="mediterranean">Mediterranean</option>
                                <option value="mexican">Mexican</option>
                                <option value="spanish">Spanish</option>
                                <option value="thai">Thai</option>
                                <option value="vietnamese">Vietnamese</option>
                                {/*If else function, if there's a recipe, render it, else give a notice to choose another cuisine */}
                            </select>
                        </label>
                        <label htmlFor="diet-restrictions-present">
                            Do you have any diet restrictions?
                            <input
                                type="radio" id="diet-restriction-present" name="diet-restriction-present" value="no"
                            /> No
                            <input
                                type="radio" id="diet-restriction-present" name="diet-restriction-present" value="yes"
                            /> Yes
                            {/*If yes, show options for diet restrictions*/}
                        </label>
                        <label htmlFor="diet-restriction">
                            What diet restrictions do you have?
                            <select name="diet-restriction" id="diet-restriction">
                                <option value="gluten-free">Gluten free</option>
                                <option value="ketogenic">Keto</option>
                                <option value="vegetarian">Vegetarian</option>
                                <option value="vegan">Vegan</option>
                                <option value="pescetarian">Pescetarian</option>
                                <option value="paleo">Paleo</option>
                            </select>
                        </label>
                        <label htmlFor="intolerances-present">
                            Do you have any intolerances?
                            <input type="radio" id="intolerances-present" name="intolerances-present" value="no"/> No
                            <input type="radio" id="intolerances-present" name="intolerances-present" value="yes"/> Yes
                            {/*If yes, then show options*/}
                        </label>
                        <label htmlFor="intolerances">
                            What intolerances do you have?
                            <select name="intolerances" id="intolerances">
                                <option value="dairy">Dairy</option>
                                <option value="egg">Egg</option>
                                <option value="gluten">Gluten</option>
                                <option value="grain">Grain</option>
                                <option value="peanut">Peanuts</option>
                                <option value="seafood">Seafood</option>
                                <option value="shellfish">Shellfish</option>
                                <option value="other">Other</option>
                                show an input field to type in allergie, use different filer
                                <input type="text"/>
                            </select>
                        </label>
                        <button type="submit">Get my recipe</button>
                    </form>
                </section>
                <article>
                    <h2>recipe</h2>
                    {/*render recipe here*/}
                </article>
            </main>
        </>
    );
}

export default WhatShouldIMake;