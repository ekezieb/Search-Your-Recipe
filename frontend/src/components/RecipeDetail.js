import React from "react";
import PropTypes from "prop-types";

const RecipeDetails = ({ ingredients }) => {
  return ingredients.map((ingredient, i) => {
    return (
      <ul key={i} className="ingredient-list">
        <li className="ingredient-text">{ingredient.recipe}</li>
      </ul>
    );
  });
};

RecipeDetails.propTypes = {
  ingredients: PropTypes.array.isRequired,
};

export default RecipeDetails;
