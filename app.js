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


const signUpRouter = require("./routes/registerRoutes");
app.use("/signUp", signUpRouter);

const logInRouter = require("./routes/logInRoutes");
app.use("/logIn", logInRouter);


app.listen(3000);