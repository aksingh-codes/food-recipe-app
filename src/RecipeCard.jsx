import React from 'react';
import "./RecipeCard.css";

function RecipeCard(recipe) {
    const recipeNew = recipe.recipe.recipe;
    console.log(recipeNew);
    return (
        <div className="recipe-card" onClick= {
            () => {
                window.open(recipeNew.url);
            }
           
        }>
        <img src={recipeNew.image} alt="" />
        <p>{recipeNew.label}</p>
        </div>        
    );
}

export default RecipeCard;
