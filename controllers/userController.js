const User = require("../models/UserSchema");
const WalletTransaction = require("../models/WalletTransaction");
const GoldTransaction = require("../models/GoldTransaction");
const mongoose = require("mongoose");

const createUser = async (req, res) => {
  const { firstName, lastName, password, mobileNumber, country, email } =
    req.body;
  try {
    const user = await User.create({
      firstName,
      lastName,
      password,
      mobileNumber,
      country,
      email,
      runningBalance: { wallet: 0, gold: 0, goldPrice: 0 },
    });
    res.status(200).json(user);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

const details = async (req, res) => {
  try {
    const { userId } = req.params;
    const WalletTransactions = await WalletTransaction.find({ userId });
    const goldTransactions = await GoldTransaction.find({ userId });
    const user = await User.findOne({ _id: userId });
    const currentFund = user.runningBalance.wallet;
    const netFundAdded = WalletTransactions.filter(
      (t) => t.type === "CREDIT"
    ).reduce((acc, t) => acc + t.amount, 0);

    const netGrowthOrLoss = goldTransactions.reduce(
      (acc, t) => acc + (t.type === "CREDIT" ? t.quantity : -t.quantity),
      0
    );

    const gainOrLossPercentage =
      (netGrowthOrLoss / user.runningBalance.gold) * 100;
    const response = {
      netFundAdded,
      currentFund,
      netGrowthOrLoss,
      gainOrLossPercentage,
    };
    res.json(response);
  } catch (e) {
    console.error(e);
    res.status(500).send("An Error Occurred");
  }
};

module.exports = { createUser, details };
