import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function NewQuiz() {
  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");
  const [choiceA, setChoiceA] = useState("");
  const [choiceB, setChoiceB] = useState("");
  const [choiceC, setChoiceC] = useState("");
  const [choiceD, setChoiceD] = useState("");
  const [correctChoice, setCorrectChoice] = useState("");
  const [questions, setQuestions] = useState([]);
  const counterRef = useRef(1);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    let pin = "";
    for (let index = 0; index < 8; index++) {
      pin += Math.floor(Math.random() * 10);
    }
    const newQuestion = {
      id: counterRef.current++,
      question,
      choices: [choiceA, choiceB, choiceC, choiceD],
      correctChoice,
    };

    fetch("/quizzes", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        pin,
        title,
        questions: questions.length === 0 ? [newQuestion] : questions,
      }),
    }).then(() => {
      setQuestions([]);
      setQuestion("");
      setChoiceA("");
      setChoiceB("");
      setChoiceC("");
      setChoiceD("");
      setCorrectChoice("");
      navigate("/");
    });
  };

  function handleAddQuestion(event) {
    event.preventDefault();
    if (question === "") {
      return;
    }
    addQuestion();
  }

  function addQuestion() {
    const newQuestion = {
      id: counterRef.current++,
      question,
      choices: [choiceA, choiceB, choiceC, choiceD],
      correctChoice,
    };
    setQuestions([...questions, newQuestion]);
    setQuestion("");
    setChoiceA("");
    setChoiceB("");
    setChoiceC("");
    setChoiceD("");
    setCorrectChoice("");
  }

  return (
    <div>
      <h1>New Quiz</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <br />
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>

        <div>
          <label>{"Question " + counterRef.current}</label>
          <br />
          <input
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
          />
        </div>

        <div>
          <label>Choice A</label>
          <br />
          <input
            value={choiceA}
            onChange={(event) => setChoiceA(event.target.value)}
          />
        </div>

        <div>
          <label>Choice B</label>
          <br />
          <input
            value={choiceB}
            onChange={(event) => setChoiceB(event.target.value)}
          />
        </div>

        <div>
          <label>Choice C</label>
          <br />
          <input
            value={choiceC}
            onChange={(event) => setChoiceC(event.target.value)}
          />
        </div>

        <div>
          <label>Choice D</label>
          <br />
          <input
            value={choiceD}
            onChange={(event) => setChoiceD(event.target.value)}
          />
        </div>

        <div>
          <label>Correct Choice</label>
          <br />
          <input
            value={correctChoice}
            onChange={(event) => setCorrectChoice(event.target.value)}
          />
        </div>

        <button onClick={handleAddQuestion}>Add question</button>
        <br></br>
        <br></br>
        <input type="submit" />
      </form>
    </div>
  );
}
