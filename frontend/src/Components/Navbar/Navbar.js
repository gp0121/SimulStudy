import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import Book from "./Book.png";

const Navbar = () => {
  const [Mobile, setMobile] = useState(false);
  const [userType, setUserType] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const userType = localStorage.getItem("user");
    if (userType) {
      setUserType(userType);
    }
  });
  function handleLogout() {
    sessionStorage.removeItem("token");
    localStorage.removeItem("user");
    setUserType();
    navigate("/");
  }
  console.log(userType);
  return (
    <>
      <nav className="navbar">
        <img src={Book} height={50} width={50} />
        <h1 className="title">SimulStudy</h1>
        <ul
          className={Mobile ? "nav-links-mobile" : "nav-links"}
          onClick={() => setMobile(false)}
        >
          <Link to="/" className="home">
            <li>Home</li>
          </Link>
          <Link to="/about" className="about">
            <li>About</li>
          </Link>
          <Link to="/quizzes" className="Take Quiz">
            <li>Take Quiz</li>
          </Link>
          <Link to="/new-quiz" className="New Quiz">
            <li>New Quiz</li>
          </Link>
          {userType !== "student" && userType !== "teacher" && (
            <Link to="/Register" className="Register">
              <li>Register</li>
            </Link>
          )}
          {!userType ? (
            <Link to="/login" className="SignIn">
              <li>Sign in</li>
            </Link>
          ) : (
            <button onClick={handleLogout}>Sign Out</button>
          )}
        </ul>
        <button className="mobile-menu-icon" onClick={() => setMobile(!Mobile)}>
          {Mobile ? <ImCross /> : <FaBars />}
        </button>
      </nav>
    </>
  );
};
export default Navbar;
