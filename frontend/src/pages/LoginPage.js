import React, { useState, useEffect } from "react";

export default function LoginPage() {
  const [inputemail, setinputemail] = useState("");
  const [inputpassword, setinputpassword] = useState("");

  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      const res = await (await fetch("/getUser")).json();

      setUser(res.user);
    };

    checkUser();
  }, []);

  const handleChangeInput = (event) => {
    if (event.target.name === "username") {
      setinputemail(event.target.value);
    } else {
      setinputpassword(event.target.value);
    }
  };

  const handleClick = async () => {
    const res = await fetch("/logout");

    if (res) {
      window.location.href = "/";
    }

    setUser(null);
  };

  const loginForm = (
    <div className="row">
      <div className="col">
        <form action="/signin" method="post" className="d-flex">
          <input
            type="email"
            onChange={(event) => handleChangeInput(event)}
            className="form-control me-2"
            name="username"
            value={inputemail}
            placeholder="Email"
          />

          <input
            type="password"
            onChange={(event) => handleChangeInput(event)}
            className="form-control me-2"
            name="password"
            value={inputpassword}
            placeholder="Password"
          />

          <button className="btn btn-primary" type="submit" value="Submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );

  const logoutForm = (
    <div>
      {user}
      <button className="btn-outline-success btn" onClick={handleClick}>
        Log out
      </button>
    </div>
  );
  return <div>{user ? logoutForm : loginForm}</div>;
}
