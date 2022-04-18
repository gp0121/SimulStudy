const express = require("express");
const app = express();
var bodyParser = require("body-parser");
const Teacher = require("./models/teacher");
const Quiz = require("./models/quiz");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
var cors = require("cors");
const port = 3000;

const secret = "mysecretsshhh";

app.use(cors());

// parse application/json
app.use(bodyParser.json());

// "DB"
mongoose.connect("mongodb://localhost:27017/SimulStudy", {
  useNewUrlParser: "true",
});
mongoose.connection.on("error", (err) => {
  console.log("err", err);
});
mongoose.connection.on("connected", (err, res) => {
  console.log("mongoose is connected");
});

const students = [
  { id: 1, name: "John Jr Smith" },
  { id: 2, name: "Allen Jr Smith" },
  { id: 3, name: "Sally Jr Smith" },
];

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/quizzes", async (req, res) => {
  const newQuizData = req.body; // { name: "Adam", email: "email@email.com" }
  const newQuiz = new Quiz(newQuizData);
  await newQuiz.save();
  res.json(newQuiz);
});

app.get("/quizzes/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const quiz = await Quiz.findById(id);
    res.json({ data: quiz });
  } catch (error) {
    res.status(404).json({ error: "No quiz with that id" });
  }
});

// Get all quizzes
app.get("/quizzes", async (req, res) => {
  // use quiz model
  const quizzes = await Quiz.find(); // returns all the docs in the quizzes collection
  res.json(quizzes);
});

// Get all teachers
app.get("/teachers", async (req, res) => {
  // use teacher model
  const teachers = await Teacher.find(); // returns all the docs in the teachers collection
  res.json(teachers);
});

// Create a teacher
app.post("/teachers", async (req, res) => {
  const newTeacherData = req.body; // { name: "Adam", email: "email@email.com" }
  const newTeacher = new Teacher(newTeacherData);
  await newTeacher.save();
  res.json(newTeacher);
});

// Get one teach by id
// GET /teacher/2
app.get("/teachers/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const teacher = await Teacher.findById(id);
    res.json(teacher);
  } catch (error) {
    res.status(404).json({ error: "No teacher with that id" });
  }
});

// Create a student
app.post("/students", (req, res) => {
  const newStudent = req.body;
  students.push(newStudent);
  res.json(students);
});

// Login
app.use("/login", (req, res) => {
  const { username, password } = req.body;
  Teacher.findOne({ username }, function (err, teacher) {
    if (err) {
      console.error(err);
      res.status(500).json({
        error: "Internal error please try again",
      });
    } else if (!teacher) {
      res.status(401).json({
        error: "Incorrect username or password",
      });
    } else {
      teacher.isCorrectPassword(password, function (err, same) {
        if (err) {
          res.status(500).json({
            error: "Internal error please try again",
          });
        } else if (!same) {
          res.status(401).json({
            error: "Incorrect password",
          });
        } else {
          // Issue token
          const payload = { username };
          const token = jwt.sign(payload, secret);
          res.status(200).json({ token: token });
        }
      });
    }
  });
});

// Starts the server on port 3000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});