const express = require("express");
const bcrypt = require("bcryptjs");
const dotenv = require('dotenv')


const app = express();
app.set("view engine", "ejs");

//middleware & static files
app.use(express.static("public"));
app.use(express.urlencoded({extended: 'false'}));
app.use(express.json());


app.get("/", (req, res) => {
    res.render("index");
});


const signUpRouter = require("./routes/signUp");
app.use("/signUp", signUpRouter);

const authRouter = require("./routes/auth");
app.use("/auth", authRouter);


// const logInRouter = require("./routes/logIn");
// app.use("/logIn", logInRouter);


app.listen(3000);