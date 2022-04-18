const Mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const teacherSchema = new Mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  username: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

teacherSchema.pre("save", function (next) {
  // Check if document is new or a new password has been set
  if (this.isNew || this.isModified("password")) {
    // Saving reference to this because of changing scopes
    const document = this;
    bcrypt.hash(document.password, saltRounds, function (err, hashedPassword) {
      if (err) {
        next(err);
      } else {
        document.password = hashedPassword;
        next();
      }
    });
  } else {
    next();
  }
});

teacherSchema.methods.isCorrectPassword = function (password, callback) {
  if (password == this.password) {
    callback(false, true);
  } else {
    callback(true);
  }
  // bcrypt.compare(password, this.password, function (err, same) {
  //   if (err) {
  //     callback(err);
  //   } else {
  //     callback(err, same);
  //   }
  // });
};

const Teacher = Mongoose.model("Teacher", teacherSchema);

module.exports = Teacher;
