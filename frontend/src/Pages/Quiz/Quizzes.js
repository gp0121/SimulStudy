import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
export default function Quizzes() {
  const [quizzes, setQuizzes] = useState([]);
  useEffect(() => {
    const fetchQuizzes = async () => {
      const resp = await fetch("/quizzes");
      const respJSON = await resp.json();
      setQuizzes(respJSON);
    };

    fetchQuizzes();
  }, []);
  return (
    <div>
      <h1>Take Quiz</h1>
      <ul>
        {quizzes.map((quiz) => (
          <li>
            <Link to={`/quizzes/${quiz._id}`}>{quiz.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}