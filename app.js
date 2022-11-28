const express = require("express");

const app = express();
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    
})



const logInRouter = require("./routes/logIn");
const signUpRouter = require("./routes/signUp");


app.use("/logIn", logInRouter);
app.use("/signUp", signUpRouter);




app.listen(3000);