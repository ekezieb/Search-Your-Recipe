function MyAuth() {
  const passport = require("passport");
  const Strategy = require("passport-local").Strategy;

  const myAuth = {};

  myAuth.setupPassport = (app) => {
    const myDB = require("../db/MyDB.js");

    // Configure the local strategy for use by Passport.
    //
    // The local strategy requires a `verify` function which receives the credentials
    // (`email` and `password`) submitted by the user.  The function must verify
    // that the password is correct and then invoke `cb` with a user object, which
    // will be set at `req.user` in route handlers after authentication.
    passport.use(
      new Strategy(async (username, password, cb) => {
        console.log("*** in passport.use");
        const data = {
          email: username,
          password: password,
        };
        console.log("My data " + data.email, data.password);
        try {
          const user = await myDB.findByEmail(data);
          console.log(user);

          if (!user) {
            console.log("*** no user");
            console.log("User not found");
            return cb(null, false);
          }

          if (user.password !== password) {
            console.log("Wrong password");
            return cb(null, false);
          }

          return cb(null, user);
        } catch (err) {
          return cb(err);
        }
      })
    );

    passport.serializeUser(function (user, cb) {
      cb(null, user.username);
    });

    passport.deserializeUser(async (username, cb) => {
      try {
        return cb(null, username);
      } catch (err) {
        console.log("Error deserializing");
        return cb(err);
      }
    });

    app.use(
      require("express-session")({
        secret: "Bernard the secret",
        resave: false,
        saveUninitialized: false,
      })
    );
    app.use(passport.initialize());
    app.use(passport.session());
  };

  myAuth.authRouter = () => {
    const express = require("express");
    const router = express.Router();

    router.post(
      "/signin",
      passport.authenticate("local", {
        successRedirect: "/create",
        failureRedirect: "/",
      }),

      function (req, res) {
        res.redirect("/create");
      },
      function (req, res) {
        res.redirect("/");
      }
    );

    router.get("/logout", function (req, res) {
      req.logout();
      res.redirect("/");
    });

    router.get("/getUser", (req, res) => {
      console.log("get user", req.user);
      res.send({ user: req.user ? req.user : null });
    });

    return router;
  };

  return myAuth;
}

module.exports = MyAuth();
