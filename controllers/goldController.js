const User = require("../models/UserSchema");
const WalletTransaction = require("../models/WalletTransaction");
const GoldTransaction = require("../models/GoldTransaction");
const mongoose = require("mongoose");
const app = require("express")();
const { createwallet } = require("./walletController");

const creategold = async (req, res) => {
  const { userId } = req.params;
  const { type } = req.query;
  const { quantity, status, amount } = req.body;
  try {
    const user = await User.findOne({ _id: userId });
    runningBalance = user.runningBalance.wallet;
    type === "CREDIT" ? (runningBalance -= amount) : (runningBalance += amount);

    const update = await User.findByIdAndUpdate(
      { _id: userId },
      { "runningBalance.wallet": runningBalance }
    );
    const wallet = await WalletTransaction.create({
      userId,
      amount,
      type: type === "CREDIT" ? "DEBIT" : "CREDIT",
      status,
      runningBalance,
    });
  } catch (e) {
    console.log(e.message);
  }

  try {
    const user = await User.findOne({ _id: userId });
    let goldPrice = user.runningBalance.goldPrice;
    let gold = user.runningBalance.gold;

    if (type === "CREDIT") {
      gold += quantity;
      goldPrice += amount;
    } else {
      gold -= quantity;
      goldPrice -= amount;
    }

    let wallet = user.runningBalance.wallet;
    const update = await User.findByIdAndUpdate(
      { _id: userId },
      { "runningBalance.gold": gold, "runningBalance.goldPrice": goldPrice }
    );
    const transaction = GoldTransaction.create({
      userId,
      entityUser: userId,
      quantity,
      amount,
      type,
      status,
      runningBalance: { wallet, loyaltyPoints: 5, gold },
    });
    res.status(200).json(transaction);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { creategold };
