import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Timer from "../Timer/Timer";
import "./Quiz.css";

export default function Quiz() {
  const { id } = useParams();
  const [quiz, setQuiz] = useState();
  const [question, setQuestion] = useState();
  useEffect(() => {
    const fetchQuiz = async () => {
      const resp = await fetch(`/quizzes/${id}`);
      const respJSON = await resp.json();
      const quiz = respJSON.data;
      setQuiz(quiz);
      setQuestion({
        ...quiz.questions[0],
        number: 1,
        answeredCorrect: undefined,
      });
    };

    fetchQuiz();
  }, []);

  const handleChoiceClick = (choiceIndex) => {
    const correctChoice = question.correctChoice;
    const chosenChoice = question.choices[choiceIndex];
    if (correctChoice == chosenChoice) {
      // guessed right
      setQuestion({ ...question, answeredCorrect: true });
    } else {
      // guessed wrong
      setQuestion({ ...question, answeredCorrect: false });
    }
  };

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

  return (
    <div>
      <main>
        <div className="questions-card">
          <Timer />
          <div className="questions-section">
            <div id="question-number">
              <p>Question {question?.number}:</p>
            </div>
            <div id="ask-question">
              <p>{question?.question}</p>
            </div>
          </div>
          <div className="answer-section">
            <div id="question-answers">
              <button
                className={determineClass(question?.choices[0])}
                onClick={handleChoiceClick}
              >
                <p>{question?.choices[0]}</p>
              </button>
              <button
                className={determineClass(question?.choices[1])}
                onClick={handleChoiceClick}
              >
                <p>{question?.choices[1]}</p>
              </button>
              <button
                className={determineClass(question?.choices[2])}
                onClick={handleChoiceClick}
              >
                <p>{question?.choices[2]}</p>
              </button>
              <button
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

// class Quiz extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       index: 0,
//       qNum: 1,
//       name: "answer-btn1",
//       qBox: {
//         question: "1+1",
//         A: "2",
//         B: "3",
//         C: "4",
//         D: "5",
//         answer: "2",
//       },
//     };

//     fetch("http://localhost:3000/teachers").then((resp) => console.log(resp));
//   }

//   correct = () => {
//     this.setState({ name: "correctAnswer" });
//   };
//   wrong = () => {
//     this.setState({ name: "wrongAnswer" });
//   };
//   render() {
//     return (

//     );
//   }
// }

// export default Quiz;
