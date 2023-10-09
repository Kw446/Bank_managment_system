const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");

const bankSchema = require("../model/bankSchema");

module.exports = {
  createBank: async (req, res) => {
    try {
      const bankData = new bankSchema(req.body);
      const isBankExists = await bankSchema.findOne({
        bankEmail: req.body.bankEmail,
      });
      if (isBankExists) {
        res.status(409).json({
          success: false,
          message: "This bank already exists, please create new one",
        });
      }
       const filePath = `/uploads/bank_logos/${req.file.filename}`;
      //const filePath = path.join("/uploads/bank_logos/images.jpg");
      bankData.bankLogo = filePath;
      const salt = await bcrypt.genSalt(10);
      const encryptedPassword = await bcrypt.hash(req.body.bankPassword, salt);
      bankData.bankPassword = encryptedPassword;
      await bankData.save();
      res.status(201).json({
        success: true,
        message: "Bank account created successfully",
        createdBank: bankData,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
  bankLogIn: async (req, res) => {
    try {
      const bankData = await bankSchema.findOne({
        bankEmail: req.body.bankEmail,
      });
      const hashPassword = await bcrypt.compare(
        req.body.bankPassword,
        bankData.bankPassword
      );
      if (bankData && hashPassword) {
        const token = await jwt.sign(
          { bankId: bankData._id },
          process.env.SECRET_KEY,
          { expiresIn: "4h" }
        );
        res.status(200).json({
          success: true,
          message: "Logged in successfully",
          accessToken: token,
        });
      } else {
        res.status(401).json({
          success: false,
          message: "Email or password is not valid",
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
  viewCustomer: async (req, res) => {
    const bankId = req.params.id;
    try {
      const bankData = await bankSchema.aggregate([
        {
          $lookup: {
            from: "users",
            localField: "_id",
            foreignField: "bankId",
            as: "customerDetails",
          },
        },
        {
          $project: {
            _id: 0,
            bankName: 1,
            bankEmail: 1,
            
            customerDetails:{ 
              userFullName: 1,
              userEmail: 1,
              userPhone: 1,
            }
          },
        },
      ]);
      if (bankData.length === 0) {
        res.status(404).json({
          success: false,
          message: "Bank not found.",
        });
      } else {
        const customerDetails = bankData[0];
        res.status(200).json({
          success: true,
          message: "Customer data fetched successfully",
          customerData: customerDetails,
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
  
}