import React, { useState } from "react";
import YesAlert from "../components/YesAlert";
import NoAlert from "../components/NoAlert";

export default function SignupPage() {
  const [inputemail, setinputemail] = useState("");
  const [inputfname, setinputfname] = useState("");
  const [inputlname, setinputlname] = useState("");
  const [inputpassword, setinputpassword] = useState("");
  const [inputconfirmedpassword, setinputconfirmedpassword] = useState("");
  const [alert, setAlert] = useState("");

  const data = {
    fname: inputfname,
    lname: inputlname,
    email: inputemail,
    confirmedpassword: inputconfirmedpassword,
    password: inputpassword,
  };
  const getData = async () => {
    setAlert("");
    if (data.confirmedpassword === data.password && data.password.length >= 8) {
      const response = await fetch("/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const res = await response.json();

      if (res.verify) {
        setAlert("Signup successful");
      } else {
        setAlert("Email already in use");
      }
    } else {
      setAlert(
        "Invaild entree! Password must be 8 or more characters. Try again."
      );
    }
  };
  const handleChangeInput = (event) => {
    if (event.target.name === "email") {
      setinputemail(event.target.value);
    } else if (event.target.name === "fname") {
      setinputfname(event.target.value);
    } else if (event.target.name === "lname") {
      setinputlname(event.target.value);
      console.log("inputlname" + setinputfname);
    } else if (event.target.name === "password") {
      setinputpassword(event.target.value);
    } else {
      setinputconfirmedpassword(event.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getData();
    setinputfname("");
    setinputlname("");
    setinputemail("");
    setinputemail("");
    setinputpassword("");
    setinputconfirmedpassword("");
  };

  return (
    <div className="row">
      {alert !== "" &&
        alert !== "Email already in use" &&
        alert !== "Signup successful" && <NoAlert alert={alert} />}
      {alert !== "" &&
        alert !== "Email already in use" &&
        alert !==
          "Invaild entree! Password must be 8 or more characters. Try again." && (
          <YesAlert alert={alert} />
        )}
      {alert !== "" &&
        alert !== "Signup successful" &&
        alert !==
          "Invaild entree! Password must be 8 or more characters. Try again." && (
          <NoAlert alert={alert} />
        )}

      <div className="col">
        <h1>Sign Up</h1>
        <form className="form-add" onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="name"
              onChange={(event) => handleChangeInput(event)}
              className="form-control"
              id="firstName"
              name="fname"
              value={inputfname}
              placeholder="First"
            />
          </div>
          <div className="mb-3">
            <input
              type="name"
              onChange={(event) => handleChangeInput(event)}
              className="form-control"
              id="lastName"
              name="lname"
              value={inputlname}
              placeholder="Last"
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              onChange={(event) => handleChangeInput(event)}
              className="form-control"
              id="InputEmail"
              name="email"
              value={inputemail}
              placeholder="Email"
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              onChange={(event) => handleChangeInput(event)}
              className="form-control me-2"
              id="InputPassword"
              name="password"
              value={inputpassword}
              placeholder="Password"
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              onChange={(event) => handleChangeInput(event)}
              className="form-control me-2"
              id="ConPassword"
              name="confirmedpassword"
              value={inputconfirmedpassword}
              placeholder="Confirm Password"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Join now
          </button>
        </form>
      </div>
    </div>
  );
}
