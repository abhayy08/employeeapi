const express = require("express");
const path = require("path");
const { connectToMongoDB } = require("./connection");

const User = require("./models/user");

const { logReqRes } = require("./middlewares");

const userRouter = require("./routes/user");

const app = express();
const PORT = process.env.PORT || 8000;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Connection with Mongoose (MongoDB)
connectToMongoDB(process.env.MONGO_URL)
    .then(() => console.log("MongoDB Connected"));

//Middleware
app.use(express.urlencoded({ extented: false }));
app.use(logReqRes("log.txt"));

//Routes
// to display the users in html doc 
app.get("/users", async (req, res) => {
    const allUsers = await User.find({});
    return res.render("userhtml", { users: allUsers });
});

// to use the API (CRUD)
app.use("/api/users", userRouter);

app.listen(PORT, () => {
    console.log(`Server Started at PORT: ${PORT}`);
});
