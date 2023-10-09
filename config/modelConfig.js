const mongoose = require("mongoose");

mongoose.connect(process.env.URL, {
  useNewUrlParser: true,
});
mongoose.connection.on("error", (err) => {
  console.log("Database did not connect ");
});
mongoose.connection.on("connected", (err) => {
  console.log("Database connected successfully");
});
