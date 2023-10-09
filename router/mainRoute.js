const express = require("express");

const bankRouter = require("./bankRoute");
const userRouter = require("./userRoute");
const transactionRouter = require("./transactionRoute");

const mainRouter = express.Router();

mainRouter.use("/bank", bankRouter);
mainRouter.use("/user", userRouter);
mainRouter.use("/transaction", transactionRouter);

module.exports = mainRouter;
