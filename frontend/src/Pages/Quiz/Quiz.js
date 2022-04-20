import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Timer from "../Timer/Timer";
import "./Quiz.css";

export default function Quiz() {
  const { id } = useParams();
  const [quiz, setQuiz] = useState();
  const [question, setQuestion] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchQuiz = async () => {
      const resp = await fetch(`/quizzes/${id}`);
      const respJSON = await resp.json();
      const quiz = respJSON.data;
      setQuiz({
        ...quiz,
        currentQuestionIndex: 0,
        lastQuestionIndex: quiz.questions.length - 1,
      });
      setQuestion({
        ...quiz.questions[0],
        number: 1,
        answeredCorrect: undefined,
      });
    };

    fetchQuiz();
  }, []);

  const handleChoiceClick = (event) => {
    const choiceIndex = event.currentTarget.id;
    const correctChoice = question.correctChoice;
    const chosenChoice = question.choices[choiceIndex];
    const { questions, currentQuestionIndex } = quiz;
    if (correctChoice === chosenChoice) {
      // guessed right
      const updatedQuestion = { ...question, answeredCorrect: true };
      const updatedQuestions = [
        ...questions.slice(0, currentQuestionIndex),
        updatedQuestion,
        ...questions.slice(currentQuestionIndex + 1),
      ];
      console.log("Updated Questions ", updatedQuestions);
      console.log("Updated Question ", updatedQuestion);

      setQuiz({
        ...quiz,
        questions: updatedQuestions,
      });
      setQuestion(updatedQuestion);
    } else {
      // guessed wrong
      const updatedQuestion = { ...question, answeredCorrect: false };

      setQuestion(updatedQuestion);
    }
  };

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  useEffect(async () => {
    if (question?.answeredCorrect !== undefined) {
      await sleep(1000);
      // question was answered
      const { questions, currentQuestionIndex, lastQuestionIndex } = quiz;
      if (currentQuestionIndex === lastQuestionIndex) {
        // quiz is over
        // store quiz result
        const resp = await fetch("/quiz-results", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(quiz),
        })
          .then((response) => response.json())
          .then((resp) => {
            navigate(`/quiz-results/${resp._id}`);
          });
      } else {
        const nextQuestionIndex = currentQuestionIndex + 1;
        setQuiz({
          ...quiz,
          currentQuestionIndex: nextQuestionIndex,
          _id: undefined,
        });
        setQuestion(questions[nextQuestionIndex]);
      }
    }
  }, [question?.answeredCorrect]);

  const determineClass = (choice) => {
    if (choice == undefined) return;
    const correctChoice = question.correctChoice;
    if (question.answeredCorrect == undefined) {
      return "answer-btn1";
    } else if (correctChoice == choice) {
      return "correctAnswer";
    } else {
      return "wrongAnswer";
    }
  };
  console.log(quiz);
  return (
    <div>
      <main>
        <div className="questions-card">
          <Timer />
          <div className="questions-section">
            <div id="question-number">
              <p>Question {question?.number}:</p>
            </div>
            <div id="ask-question" className="text-black">
              <p>{question?.question}</p>
            </div>
          </div>
          <div className="answer-section">
            <div id="question-answers">
              <button
                id="0"
                className={determineClass(question?.choices[0])}
                onClick={handleChoiceClick}
              >
                <p>{question?.choices[0]}</p>
              </button>
              <button
                id="1"
                className={determineClass(question?.choices[1])}
                onClick={handleChoiceClick}
              >
                <p>{question?.choices[1]}</p>
              </button>
              <button
                id="2"
                className={determineClass(question?.choices[2])}
                onClick={handleChoiceClick}
              >
                <p>{question?.choices[2]}</p>
              </button>
              <button
                id="3"
                className={determineClass(question?.choices[3])}
                onClick={handleChoiceClick}
              >
                <p>{question?.choices[3]}</p>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
