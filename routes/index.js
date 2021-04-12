const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;

const myDB = require("../db/MyDB.js");

router.post("/signup", async (req, res) => {
  const fname = req.body.fname;
  const lname = req.body.lname;
  const email = req.body.email;

  try {
    const password = req.body.password;
    const hashedPwd = await bcrypt.hash(password, saltRounds);
    const data = {
      fname: fname,
      lname: lname,
      email: email,
      password: hashedPwd,
    };

    const verify = await myDB.signup(data);

    res.send({ verify: verify });
  } catch (e) {
    console.log("Error", e);
    res.status(400).send({ err: e });
  }
});

// data endpoint for posts
router.post("/GetIngredients", async (req, res) => {
  delete req.session.msg;
  const item =
    req.body.item.charAt(0).toUpperCase() +
    req.body.item.slice(1).replace(/\s+/g, "");

  try {
    const ingredients = await myDB.GetIngredients(item);

    res.send({ ingredients: ingredients });
  } catch (e) {
    res.status(400).send({ err: e });
    console.log("Error", e);
  }
});

router.post("/Initialize", async (req, res) => {
  delete req.session.msg;
  const user = req.body.user;

  try {
    const ingredients = await myDB.Initialize(user);

    res.send({ ingredients: ingredients });
  } catch (e) {
    res.status(400).send({ err: e });
    console.log("Error", e);
  }
});

router.post("/DeletePost", async (req, res) => {
  delete req.session.msg;
  //const user = req.body.user;
  const data = {
    user: req.body.user,
    full_name: req.body.full_name,
  };

  try {
    await myDB.DeletePost(data);
  } catch (e) {
    res.status(400).send({ err: e });
    console.log("Error", e);
  }
});

/* GET home page. */
router.get("/", function (req, res) {
  res.render("index", "/");
});

router.post("/PostIngredients", async (req, res) => {
  const full_name = req.body.full_name;
  const recipe = req.body.recipe;
  const user = req.body.user;

  const item =
    req.body.item.charAt(0).toUpperCase() +
    req.body.item.slice(1).replace(/\s+/g, "");

  const data = {
    full_name: full_name,
    item: item,
    recipe: recipe,
    user: user,
  };

  try {
    await myDB.PostIngredients(data);
    // req.session.msg = `Country: ${data.country}`;

    res.send({ create: "ok" });
  } catch (e) {
    console.log("Error", e);
    res.status(400).send({ err: e });
  }
});

module.exports = router;
