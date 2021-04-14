import LoginPage from "../pages/LoginPage";
import { Link, useLocation } from "react-router-dom";

export default function NavigationComponent({ username }) {
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand nav-logo" to="/">
          <img src="/img/dishes.png" alt="Profile" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={
                  "nav-link" + (location.pathname === "/" ? " active" : "")
                }
                to="/"
              >
                Home
              </Link>
            </li>
            {username && (
              <li className="nav-item">
                <Link
                  className={
                    "nav-link" +
                    (location.pathname === "/create" ? " active" : "")
                  }
                  to="/create"
                >
                  Create Recipe
                </Link>
              </li>
            )}
            {!username && (
              <li className="nav-item">
                <Link
                  className={
                    "nav-link" +
                    (location.pathname === "/signup" ? " active" : "")
                  }
                  to="/signup"
                >
                  Signup
                </Link>
              </li>
            )}
          </ul>

          <LoginPage />
        </div>
      </div>
    </nav>
  );
}
