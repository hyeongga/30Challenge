const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/user");
const todoRouter = require("./routes/todo");

const app = express();
const port = 3010;

app.use(cors());
app.use(express.json());
app.use("/user", userRouter);
app.use("/todo", todoRouter);

app.get("/", (req, res) => {
  res.send("hello,express");
});

app.listen(port, () => {
  console.log(`Server listening on port : ${port}👻`);
});
