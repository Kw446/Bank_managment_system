const express = require("express");

const bank = require("../controller/bankController");
const { bankLogoImageUpload } = require("../middelware/bankLogoUpload");
const { tokenAuthentication } = require("../middelware/authToken");


const bankRouter = express.Router();

bankRouter.post("/create",bankLogoImageUpload.single("bankLogo"),bank.createBank);
bankRouter.post("/login", bank.bankLogIn);
bankRouter.get("/customerdetails/:id", tokenAuthentication, bank.viewCustomer);

module.exports = bankRouter;


