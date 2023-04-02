const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./UserSchema");
const Transaction = require("./GoldTransaction");

const walletTransactionSchema = new Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: User,
    }, // To store the user id
    amount: {
      type: Number,
      required: true,
    }, // Amount of the transaction done.
    type: {
      type: String,
      required: true,
      enums: ["CREDIT", "DEBIT"],
    }, // Type - debit or credit.
    status: {
      type: String,
      required: true,
      enums: ["FAILED", "SUCCESS", "PROCESSING"],
    }, // Status of the transaction being done.
    runningBalance: {
      type: Number,
      required: true,
    }, // Running Balance of the user after each transaction.
    transaction: {
      type: mongoose.Types.ObjectId,
      ref: Transaction,
    }, // Gold transactions reference.
  },
  { timestamps: true }
);

const WalletTransaction = mongoose.model("Wallet", walletTransactionSchema);
module.exports = WalletTransaction;
