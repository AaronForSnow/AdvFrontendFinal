import { useNavigate } from "react-router-dom";
import menuIcon from "/menu_burger.svg";
import { LogIn } from "./Authentication/LogIn";
import { useAuth } from "react-oidc-context";

export function NavBar() {
  const auth = useAuth();
  const navigate = useNavigate();
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container-fluid">
          {/* Brand logo or name */}
          <a className="navbar-brand text-light" onClick={() => navigate("/")}>
            Aaron's Recipies
          </a>
          <LogIn />

          <button
            className="navbar-toggler bg-secondary hamburger"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <img src={menuIcon} />
          </button>

          {/* Navbar links */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ">
              <li className="nav-item">
                <GoTo locString="" />
              </li>
              <li className="nav-item">
                <GoTo locString="Ingredients" />
              </li>
              {auth.isAuthenticated &&
                <li>
                  <GoTo locString="Recipies" />
                </li>
              }
            </ul>
          </div>
        </div>
      </nav>
      <div className="pt-5"></div>
      <div className="pt-3"></div>
      {/* padding to prevent hiding content of pages*/}
    </>
  );
}

export const GoTo = ({ locString }: { locString: string }) => {
  const navigate = useNavigate();
  const handleRedirect = () => {
    navigate("/" + locString.replace(/ /g, ""));
  };
  return (
    <button
      className="btn btn-secondary text-light MyLink"
      onClick={() => handleRedirect()}
      style={{ minWidth: "100%" }}
    >
      {locString ? locString : "Home page"}
    </button>
  );
};
