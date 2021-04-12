import React, { useState } from "react";
import RecipeDetails from "./RecipeDetail";
import PropTypes from "prop-types";

const UserRecipe = ({ recipe }) => {
  const [show, setShow] = useState(false);

  const DeletePost = async () => {
    window.location.href = "/create";

    await fetch("/DeletePost", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(recipe),
    });

    //console.log(food);
  };

  return (
    <div className="recipe">
      <h2>
        {recipe.item} - {recipe.full_name}
      </h2>
      <img src="/img/dishes.png" alt="Profile" />
      <div className="mb-3"></div>
      <button onClick={() => setShow(!show)}>Ingredients</button>
      <div className="mb-3"></div>
      <button id="delete" onClick={DeletePost}>
        Delete
      </button>
      {show && <RecipeDetails ingredients={recipe.recipe} />}
    </div>
  );
};

UserRecipe.propTypes = {
  recipe: PropTypes.object.isRequired,
};

export default UserRecipe;
