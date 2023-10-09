const transactionSchema = require("../model/transactionSchema");
const userSchema = require("../model/userSchema");

module.exports = {
  userTransaction: async (req, res) => {
    try {
      const senderId = req.params.id;
      const { receiverPhoneNo, amountToBeSent } = req.body;
      const transactionData = new transactionSchema();
      const senderData = await userSchema.findById(senderId);
      const receiverData = await userSchema.findOne({
        userPhone: receiverPhoneNo,
      });
      transactionData.senderId = senderId;
      transactionData.receiverId = receiverData._id;
      if (senderData.userTransactionLimit < amountToBeSent) {
        res.status(400).json({
          success: false,
          message: "User's transaction limit is exceeded, can not send money",
        });
      } else {
        senderData.userCurrentAmount =
          (await senderData.userCurrentAmount) - amountToBeSent;
        receiverData.userCurrentAmount =
          (await receiverData.userCurrentAmount) + amountToBeSent;
      }
      await senderData.save();
      await receiverData.save();
      await transactionData.save();
      res.status(201).json({
        success: true,
        message: "Transaction has been done successfully",
        transactionData: transactionData,
        transactionAmount: amountToBeSent,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
};
