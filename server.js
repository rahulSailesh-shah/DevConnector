const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

//Bring in routes
const users = require("./routes/users");
const auth = require("./routes/auth");
const posts = require("./routes/posts");
const profiles = require("./routes/profiles");

//Custom error handler
const errorHandler = require("./middleware/error");

//Load environment variables
dotenv.config({ path: "./config/config.env" });

//Connect to database
connectDB();

const app = express();

//Body parser
app.use(express.json());

//Mount routes
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/post", posts);
app.use("/api/profile", profiles);

app.use(errorHandler);

const PORT = process.env.PORT || 9000;

app.get("/", (req, res) => {
  res.send("API running");
});

app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`));
