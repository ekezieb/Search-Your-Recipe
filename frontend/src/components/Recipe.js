import React, { useState } from "react";
import RecipeDetails from "./RecipeDetail";
import PropTypes from "prop-types";

const Recipe = ({ recipe }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="recipe">
      <h2>
        {recipe.item} - {recipe.full_name}
      </h2>
      <img src="/img/dishes.png" alt="Profile" />
      <button onClick={() => setShow(!show)}>Ingredients</button>
      {show && <RecipeDetails ingredients={recipe.recipe} />}
    </div>
  );
};

Recipe.propTypes = {
  recipe: PropTypes.object.isRequired,
};
export default Recipe;
