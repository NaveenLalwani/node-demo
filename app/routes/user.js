const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.post("/create", userController.create);
router.get("/get-my-address/:name", userController.findAddress);
router.get("/get-my-purchases/:name", userController.findPurchases);

module.exports = router;
