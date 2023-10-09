const express = require("express");

const user = require("../controller/userController");
const { tokenAuthentication } = require("../middelware/authToken");
const {userLogoImageUpload} =require("../middelware/userimage");

const userRouter = express.Router();

userRouter.post("/create/:id", userLogoImageUpload.single("userImage"),user.createUser);
userRouter.post('/login', user.userLogIn);
userRouter.get("/transactionsdetails", tokenAuthentication, user.transactionDetails)

module.exports = userRouter;
