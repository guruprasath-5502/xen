const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./UserSchema");

const goldTransactionSchema = new Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: User,
    },
    entityUser: {
      type: mongoose.Types.ObjectId,
      ref: User,
    },
    quantity: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["CREDIT", "DEBIT"],
    },
    status: {
      type: String,
      required: true,
      enum: ["FAILED", "SUCCESS", "WAITING", "CANCELED", "PENDING"],
    },
    runningBalance: {
      wallet: { type: Number, required: true },
      loyaltyPoints: { type: Number, required: true },
      gold: { type: Number, required: true },
    },
  },
  { timestamps: true }
);

const GoldTransaction = mongoose.model(
  "GoldTransaction",
  goldTransactionSchema
);

module.exports = GoldTransaction;
