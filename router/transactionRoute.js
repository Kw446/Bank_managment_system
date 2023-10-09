const express = require("express");

const {userTransaction} = require("../controller/transactionControllers");
const { tokenAuthentication } = require("../middelware/authToken");

const transactionRouter = express.Router();

transactionRouter.post("/create/:id", tokenAuthentication, userTransaction )

module.exports = transactionRouter;
