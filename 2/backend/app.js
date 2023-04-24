const express = require("express");
const cors = require("cors");

const app = express();
const port = 3010;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello,Express!");
});

app.listen(port, () => {
  console.log(`server listening on port : ${port}✨`);
});
