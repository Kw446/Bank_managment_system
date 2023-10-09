require("dotenv").config();
const express = require("express");
require("./config/modelConfig");

const mainRouter = require("./router/mainRoute");

const HOST = "https://localhost:";
const PORT = process.env.PORT || 9001;

const app = express();

app.use(express.json());
app.use("/", mainRouter);

app.listen(PORT, (req, res) => {
  console.log(`Server is running on ${HOST}${PORT}`);
});
