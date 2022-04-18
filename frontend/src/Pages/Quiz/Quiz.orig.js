import React, { useState, useEffect, useRef } from "react";
import "./Quiz.css";
import Timer from "../Timer/Timer";
import { isCompositeComponentWithType } from "react-dom/test-utils";

class Quiz extends React.Component {
  constructor() {
    super();
    this.state = {
      index: 0,
      qNum: 1,
      name: "answer-btn1",
      qBox: {
        question: "1+1",
        A: "2",
        B: "3",
        C: "4",
        D: "5",
        answer: "2",
      },
    };

    fetch("http://localhost:3000/teachers").then((resp) => console.log(resp));
  }

  correct = () => {
    this.setState({ name: "correctAnswer" });
  };
  wrong = () => {
    this.setState({ name: "wrongAnswer" });
  };
  render() {
    return (
      <div>
        <main>
          <div className="questions-card">
            <Timer />
            <div className="questions-section">
              <div id="question-number">
                <p>Question {this.state.qNum}:</p>
              </div>
              <div id="ask-question">
                <p>{this.state.qBox.question}</p>
              </div>
            </div>
            <div className="answer-section">
              <div id="question-answers">
                <button
                  className={
                    this.state.name == "answer-btn1"
                      ? "answer-btn1"
                      : "correctAnswer"
                  }
                  onClick={this.correct}
                >
                  <p>{this.state.qBox.A}</p>
                </button>
                <button
                  className={
                    this.state.name == "answer-btn1"
                      ? "answer-btn1"
                      : "wrongAnswer"
                  }
                  onClick={this.wrong}
                >
                  <p>{this.state.qBox.B}</p>
                </button>
                <button
                  className={
                    this.state.name == "answer-btn1"
                      ? "answer-btn1"
                      : "wrongAnswer"
                  }
                  onClick={this.wrong}
                >
                  <p>{this.state.qBox.C}</p>
                </button>
                <button
                  className={
                    this.state.name == "answer-btn1"
                      ? "answer-btn1"
                      : "wrongAnswer"
                  }
                  onClick={this.wrong}
                >
                  <p>{this.state.qBox.D}</p>
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default Quiz;
