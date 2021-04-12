import React, { useState, useEffect } from "react";
import Pagination from "../components/Pagination.js";
import UserRecipe from "../components/UserRecipe";
import PropTypes from "prop-types";

export default function CreatePage({ username }) {
  const [inputFields, setInputFields] = useState("");
  const [inputFood, setinputFood] = useState("");
  const [inputRecipe, setInputRecipe] = useState([{ recipe: "" }]);
  const [foods, setfood] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  useEffect(() => {
    const getUserData = async () => {
      const response = await fetch("/Initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: username }),
      });

      const res = await response.json();
      setfood(res.ingredients);
    };

    getUserData();
  }, []);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const currentPosts = foods.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  const PostData = async () => {
    window.location.href = "/create";
    await fetch("/PostIngredients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        full_name: inputFields,
        item: inputFood,
        recipe: inputRecipe,
        user: username,
      }),
    });
  };
  const handleChangeInput = (event) => {
    if (event.target.name === "full_name") {
      setInputFields(event.target.value);
    } else if (event.target.name === "food") {
      setinputFood(event.target.value);
    }
  };

  const handleInputRecipe = (index, event) => {
    const values = [...inputRecipe];
    values[index].recipe = event.target.value;

    setInputRecipe(values);

    console.log("inputRecipe " + inputRecipe);
  };

  const handleAddFields = (e) => {
    const values = [...inputRecipe];
    values.push({ recipe: "" });

    setInputRecipe(values);

    e.preventDefault();
  };

  const handleRemoveFields = (index) => {
    if (inputRecipe.length !== 1) {
      const values = [...inputRecipe];
      values.splice(index, 1);
      setInputRecipe(values);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    PostData();
    setInputFields("");
    setinputFood("");
    setInputRecipe([{ recipe: "" }]);
  };

  return (
    <div className="row">
      <div className="col">
        <h1>Create Recipe</h1>

        <div className="profile">
          <img src="/img/dishes.png" alt="Profile" />
        </div>
        <div className="mb-3"></div>

        <div className="mb-3"></div>

        <div>
          <form className="form-name" onSubmit={handleSubmit}>
            <div>
              <label className="form-label">
                Food Category:
                <input
                  className="form-control"
                  type="text"
                  name="food"
                  value={inputFood}
                  onChange={(event) => handleChangeInput(event)}
                  placeholder="Food"
                />
              </label>
            </div>
            <div>
              <label className="form-label">
                Specific Name:
                <input
                  className="form-control"
                  type="text"
                  name="full_name"
                  value={inputFields}
                  onChange={(event) => handleChangeInput(event)}
                  placeholder="Full Name"
                />
              </label>
            </div>
            {inputRecipe.map((inputRec, index) => (
              <div key={index}>
                <label className="form-label">
                  Add Ingredient:
                  <input
                    className="form-control"
                    type="text"
                    name="recipe"
                    value={inputRec.recipe}
                    onChange={(e) => handleInputRecipe(index, e)}
                    placeholder="Ingredient"
                  />
                </label>
                <div className="b">
                  <button
                    className="btn"
                    onClick={() => handleRemoveFields(index)}
                  >
                    <img src="/img/remove.png" alt="minus" />
                  </button>
                </div>

                <div className="b">
                  <button className="btn" onClick={handleAddFields}>
                    <img src="/img/add.png" alt="add" />
                  </button>
                </div>
              </div>
            ))}

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>

        <div className="recipes">
          {currentPosts !== [] &&
            currentPosts.map((food, i) => <UserRecipe key={i} recipe={food} />)}
        </div>

        <div>
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={foods.length}
            handlePageClick={handlePageClick}
          ></Pagination>
        </div>
      </div>
    </div>
  );
}
CreatePage.propTypes = {
  username: PropTypes.string.isRequired,
};
