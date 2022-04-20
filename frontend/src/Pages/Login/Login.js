import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

async function loginUser(credentials) {
  return fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

export default function Login({ setToken }) {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [userType, setUserType] = useState("student");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password,
      userType,
    }).then((response) => {
      localStorage.setItem("user", userType);
      const redirectURL = userType === "student" ? "/quizzes" : "/new-quiz";
      setToken(response.token);
      navigate(redirectURL);
    });
  };

  return (
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit} className="login-wrapper-inner">
        <p>Student or Teacher</p>
        <label>
          <p>Student</p>
          <input
            value={userType}
            name="userType"
            onChange={({ target }) => setUserType(target.id)}
            type="radio"
            checked={userType === "student"}
            id="student"
          />
        </label>
        <label>
          <p>Teacher</p>
          <input
            value={userType}
            name="userType"
            onChange={({ target }) => setUserType(target.id)}
            type="radio"
            checked={userType === "teacher"}
            id="teacher"
          />
        </label>
        <label>
          <p>Username</p>
          <input
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            type="text"
          />
        </label>
        <label>
          <p>Password</p>
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
          />
        </label>
        <div>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </div>
        {/* <Link to='register'>
          {"Don't have an account? Register here!"}
        </Link> */}
      </form>
    </div>
  );
}
