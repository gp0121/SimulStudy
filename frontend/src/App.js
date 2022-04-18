import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import About from "./Pages/About/About";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Quiz from "./Pages/Quiz/Quiz.js";
import Register from "./Pages/Register/Register.js";
import NewQuiz from "./Pages/Quiz/NewQuiz";
import Quizzes from "./Pages/Quiz/Quizzes";

function storeToken(userToken) {
  sessionStorage.setItem("token", JSON.stringify(userToken));
}

function getToken() {
  const tokenString = sessionStorage.getItem("token");
  const userToken = JSON.parse(tokenString);
  return userToken?.token;
}

function App() {
  const [token, setToken] = useState(getToken());

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/About" element={<About />}></Route>
        <Route path="/quizzes/:id" element={<Quiz />}></Route>
        <Route path="/new-quiz" element={<NewQuiz />}></Route>
        <Route path="/quizzes" element={<Quizzes />}></Route>
        <Route path="/Register" element={<Register />}></Route>
        <Route path="/Login" element={<Login setToken={storeToken} />}></Route>
      </Routes>
    </>
  );
}

export default App;
