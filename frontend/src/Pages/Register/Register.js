import React, { useState } from "react";
import "./Register.css";

export default function Register() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newTeacher = {
      email,
      firstName,
      lastName,
      username,
      password,
    };
    const resp = await fetch("/teachers", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTeacher),
    });
  };

  return (
    <div className="login-wrapper">
      <h1>Please Register</h1>
      <form onSubmit={handleSubmit}>
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
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
