const Mongoose = require("mongoose");

const quizResultSchema = new Mongoose.Schema({
  pin: {
    type: String,
  },
  title: {
    type: String,
  },
  quiz: { type: Mongoose.Schema.Types.ObjectId, ref: "Quiz" },
  questions: [
    {
      question: {
        type: String,
      },
      choices: [String],
      correctChoice: String,
      answeredCorrect: Boolean,
      chosenChoice: String,
    },
  ],
});
const QuizResult = Mongoose.model("QuizResult", quizResultSchema);

module.exports = QuizResult;
