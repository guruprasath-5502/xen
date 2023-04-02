const WalletTransaction = require("../models/WalletTransaction");
const mongoose = require("mongoose");
const User = require("../models/UserSchema");

const createwallet = async (req, res) => {
  const { userId } = req.params;
  const { type } = req.query;
  const { amount, status } = req.body;

  try {
    const user = await User.findOne({ _id: userId });
    runningBalance = user.runningBalance.wallet;
    req.body.quantity
      ? type === "CREDIT"
        ? (runningBalance -= amount)
        : (runningBalance += amount)
      : type === "CREDIT"
      ? (runningBalance += amount)
      : (runningBalance -= amount);
    const update = await User.findByIdAndUpdate(
      { _id: userId },
      { "runningBalance.wallet": runningBalance }
    );
    const wallet = await WalletTransaction.create({
      userId,
      amount,
      type,
      status,
      runningBalance,
    });
    res.status(200).json(wallet);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

module.exports = { createwallet };
