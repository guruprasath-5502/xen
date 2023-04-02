const router = require("express").Router();

const { createwallet } = require("../controllers/walletController");
const { creategold } = require("../controllers/goldController");

const { createUser, details } = require("../controllers/userController");

router.get("/:userId", details);
router.post("/", createUser);
router.post("/:userId", createwallet);
router.post("/gold/:userId", creategold);

module.exports = router;
