const { MongoClient } = require("mongodb");
const bcrypt = require("bcrypt");

function MyDB() {
  const myDB = {};

  const url = process.env.MONGO_URL || "mongodb://localhost:27017";

  const DB_NAME = "myFood";

  myDB.signup = async (auth) => {
    let client;

    try {
      client = new MongoClient(url, { useUnifiedTopology: true });
      console.log("Connecting to the db");
      await client.connect();
      console.log("Connected!");
      const db = client.db(DB_NAME);
      const userCol = db.collection("user");
      console.log("Collection ready, insert ", auth);
      const resEmail = await userCol.findOne({
        email: auth.email,
      });

      if (!resEmail) {
        const res = await userCol.insertOne(auth);
        console.log("Inserted", res);

        return true;
      }
      return false;
    } finally {
      console.log("Closing the connection");
      client.close();
    }
  };
  myDB.findByEmail = async (auth) => {
    let client;

    try {
      client = new MongoClient(url, { useUnifiedTopology: true });
      console.log("Connecting to the db");
      await client.connect();
      console.log("Connected!");
      const db = client.db(DB_NAME);
      const userCol = db.collection("user");
      console.log("Collection ready, find ", auth);

      const res = await userCol.findOne({
        email: auth.email,
      });

      if (res) {
        const cmp = await bcrypt.compare(auth.password, res.password);

        if (cmp) {
          let email = auth.email;
          let password = auth.password;

          return {
            username: email,
            password: password,
          };
        }
      }

      return null;
    } finally {
      console.log("Closing the connection");

      client.close();
    }
  };
  myDB.logout = () => {
    return true;
  };
  myDB.GetPost = async (post) => {
    let client;

    try {
      client = new MongoClient(url, { useUnifiedTopology: true });
      console.log("Connecting to the db");
      await client.connect();
      console.log("Connected!");
      const db = client.db(DB_NAME);
      const postsCol = db.collection("posts");
      console.log("Collection ready, find ", post.country);
      const found = await postsCol
        .find({ country: post.country })
        .sort({ $natural: -1 })
        .toArray();
      return found;
    } finally {
      console.log("Closing the connection");
      client.close();
    }
  };

  myDB.GetIngredients = async (food) => {
    let client;

    try {
      client = new MongoClient(url, { useUnifiedTopology: true });
      console.log("Connecting to the db");
      await client.connect();
      console.log("Connected!");
      const db = client.db(DB_NAME);
      const postsCol = db.collection("ingredients");
      console.log("Collection ready, find ", food);
      const found = await postsCol
        .find({ item: food })
        .sort({ $natural: -1 })
        .toArray();
      return found;
    } finally {
      console.log("Closing the connection");
      client.close();
    }
  };

  myDB.Initialize = async (user) => {
    let client;

    try {
      client = new MongoClient(url, { useUnifiedTopology: true });
      console.log("Connecting to the db");
      await client.connect();
      console.log("Connected!");
      const db = client.db(DB_NAME);
      const postsCol = db.collection("ingredients");
      console.log("Collection ready, find ", user);
      const found = await postsCol
        .find({ user: user })
        .sort({ $natural: -1 })
        .toArray();
      return found;
    } finally {
      console.log("Closing the connection");
      client.close();
    }
  };
  myDB.DeletePost = async (user) => {
    let client;

    try {
      client = new MongoClient(url, { useUnifiedTopology: true });
      console.log("Connecting to the db");
      await client.connect();
      console.log("Connected!");
      const db = client.db(DB_NAME);
      const postsCol = db.collection("ingredients");
      console.log("Collection ready, delete ", user);
      const found = await postsCol.deleteOne(user);

      return found;
    } finally {
      console.log("Closing the connection");
      client.close();
    }
  };
  myDB.PostIngredients = async (post) => {
    let client;

    try {
      client = new MongoClient(url, { useUnifiedTopology: true });
      console.log("Connecting to the db");
      await client.connect();
      console.log("Connected!");
      const db = client.db(DB_NAME);
      const postsCol = db.collection("ingredients");

      console.log("Collection ready, insert ", post);
      const insertpost = await postsCol.insertOne(post);
      console.log("Collection ready, find ", post);
      const creatPost = await postsCol.find({ country: post.item }).toArray();

      console.log("Inserted", insertpost);
      return creatPost;
    } finally {
      console.log("Closing the connection");
      client.close();
    }
  };
  return myDB;
}

module.exports = MyDB();
