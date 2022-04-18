const Mongoose = require("mongoose");

const quizSchema = new Mongoose.Schema({
  pin: {
    type: String,
  },
  title: {
    type: String,
  },
  questions: [
    {
      question: {
        type: String,
      },
      choices: [String],
      correctChoice: String,
    },
  ],
});
const Quiz = Mongoose.model("Quiz", quizSchema);

module.exports = Quiz;
