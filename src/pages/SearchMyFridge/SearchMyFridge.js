import React from 'react';

function SearchMyFridge() {
    return (
        <>
            <main>
                <h2>Search your fridge</h2>
                <p>Ever wondered what recipes you can cook with the ingredients you have in your fridge or pantry? Find
                    recipes that use as many of the given ingredients as possible and require as few additional
                    ingredients as possible. </p>
                <p>You can include ingredients to find the recipes you are looking for. Want to involve multiple
                    ingredients? You can also select a dish type
                    and time limit to further specify the results.</p>
                <form>
                    <input type="text"/>
                    <select name="course" id="course">
                        <option value="all-types">All Types</option>
                        <option value="dinner">Dinner</option>
                        {/*Main course*/}
                        <option value="lunch">Lunch</option>
                        {/*Side dish, salad, bread, soup
                        Change lunch in all pages and add all the other options
                    */}
                        <option value="breakfast">Breakfast</option>
                        <option value="dessert">Dessert</option>
                        <option value="snack">Snack</option>
                    </select>
                    <button type="submit">Search recipes</button>
                </form>
                <section>
                    <h4>number of recipes</h4>
                    <p>number of pages</p>
                    <article>
                        <h3>show recipe title, img, time and description here</h3>
                    </article>
                    <button type="previous">Previous</button>
                    <button type="next">Next</button>
                </section>
            </main>
        </>
    );
}

export default SearchMyFridge;