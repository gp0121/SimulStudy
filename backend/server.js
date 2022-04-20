const express = require("express");
const app = express();
var bodyParser = require("body-parser");
const Teacher = require("./models/teacher");
const Student = require("./models/student");
const Quiz = require("./models/quiz");
const QuizResult = require("./models/quiz-result");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
var cors = require("cors");
const { rawListeners } = require("./models/teacher");
const port = 3001;

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

app.get("/quiz-results/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const quizResult = await QuizResult.findById(id);
    res.json(quizResult);
  } catch (error) {
    res.status(404).json({ error: "No quiz result with that id" });
  }
});

app.post("/quiz-results", async (req, res) => {
  const newQuizResultData = req.body;
  delete newQuizResultData._id;
  const newQuizResult = new QuizResult(newQuizResultData);
  await newQuizResult.save();
  res.json(newQuizResult);
});

app.post("/quizzes", async (req, res) => {
  const newQuizData = req.body;
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

app.get("/quizzes/by-pin/:pin", async (req, res) => {
  const { pin } = req.params;
  try {
    const quiz = await Quiz.findOne({ pin: pin });
    res.json(quiz);
  } catch (error) {
    res.status(404).json({ error: "No quiz with that pin" });
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
  const payload = { username: newTeacher.username };
  const token = jwt.sign(payload, secret);
  console.log(token);

  res.status(201).json({ token: token });
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
/*app.post("/students", (req, res) => {
  const newStudent = req.body;
  students.push(newStudent);
  res.json(students);
});
*/

// Get all students
app.get("/students", async (req, res) => {
  // use teacher model
  const students = await Student.find(); // returns all the docs in the teachers collection
  res.json(students);
});

// Create a student
app.post("/students", async (req, res) => {
  const newStudentData = req.body; // { name: "Adam", email: "email@email.com" }
  const newStudent = new Student(newStudentData);
  await newStudent.save();
  const payload = { username: newStudent.username };
  const token = jwt.sign(payload, secret);
  console.log(token);

  res.status(201).json({ token: token });
});

// Get one student by id
// GET /student/2
app.get("/students/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const student = await Student.findById(id);
    res.json(student);
  } catch (error) {
    res.status(404).json({ error: "No student with that id" });
  }
});

// Login
app.use("/login", (req, res) => {
  const { username, password, userType } = req.body;
  console.log(userType);
  const UserType = userType === "student" ? Student : Teacher;
  UserType.findOne({ username }, function (err, user) {
    if (err) {
      console.error(err);
      res.status(500).json({
        error: "Internal error please try again",
      });
    } else if (!user) {
      res.status(401).json({
        error: "Incorrect username or password",
      });
    } else {
      user.isCorrectPassword(password, function (err, same) {
        if (err) {
          console.error(err);
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
