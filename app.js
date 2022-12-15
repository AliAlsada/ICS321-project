const express = require("express");
const session = require("express-session");
const dotenv = require('dotenv')


const app = express();
app.set("view engine", "ejs");

//middleware & static files
app.use(express.static("public"));
app.use(express.urlencoded({extended: 'false'}));
app.use(express.json());



app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true
}));

app.get("/", (req, res) => {
    res.render("index");
});

const logInRouter = require("./routes/logInRoutes");
app.use("/logIn", logInRouter);

const indexRouter = require("./routes/indexRoutes");
app.use("/index", indexRouter);

const signUpRouter = require("./routes/registerRoutes");
app.use("/signUp", signUpRouter);

const searchRouter = require("./routes/searchRoutes");
app.use("/search", searchRouter);

const sendRouter = require("./routes/sendRoutes");
app.use("/send", sendRouter);

const trackRouter = require("./routes/trackRoutes");
app.use("/track", trackRouter);



app.listen(3000);