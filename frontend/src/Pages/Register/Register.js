import React, { useState } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("student");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newTeacher = {
      email,
      firstName,
      lastName,
      username,
      password,
    };
    const route = userType === "student" ? "/students" : "/teachers";
    const resp = await fetch(route, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTeacher),
    })
      .then((response) => response.json())
      .then((response) => {
        localStorage.setItem("user", userType);
        const redirectURL = userType === "student" ? "/quizzes" : "/new-quiz";
        navigate(redirectURL);
      });
  };
  console.log(userType);
  return (
    <div className="login-wrapper">
      <h1>Please Register</h1>
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
          <p>Email</p>
          <input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            type="text"
          />
        </label>
        <label>
          <p>First Name</p>
          <input
            value={firstName}
            onChange={({ target }) => setFirstName(target.value)}
            type="text"
          />
        </label>
        <label>
          <p>Last Name</p>
          <input
            value={lastName}
            onChange={({ target }) => setLastName(target.value)}
            type="text"
          />
        </label>
        <label>
          <p>Username</p>
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            type="text"
          />
        </label>
        <label>
          <p>Password</p>
          <input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            type="password"
          />
        </label>
        <div>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
