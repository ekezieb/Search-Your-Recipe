import React, { useState, useEffect } from "react";

const Toogle = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const data = window.localStorage.getItem("mytoogle");

    setShow(JSON.parse(data));
    if (data === "false") {
      document.body.style = "background: #121212;";
    } else {
      document.body.style = "background: none;";
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("mytoogle", JSON.stringify(show));
  });

  const LightMode = () => {
    setShow(false);
    document.body.style = "background: #121212;";
  };

  const DarkMode = () => {
    setShow(true);
    document.body.style = "background: none;";
  };

  return (
    <div className="col">
      <div>Switch</div>
      {show ? (
        <div>
          <button className="toogle-btn" onClick={LightMode}>
            <img src="/img/light-toggle.png" alt="light" />
          </button>
          <div>Light Mode</div>
        </div>
      ) : (
        <div>
          <button className="toogle-btn" onClick={DarkMode}>
            <img src="/img/dark-toggle.png" alt="dark" />
          </button>
          <div>Dark Mode</div>
        </div>
      )}
    </div>
  );
};

export default Toogle;
