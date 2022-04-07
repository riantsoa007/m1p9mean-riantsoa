const express = require("express");
const router = express.Router();

const UserController = require('../controllers/UserController');
const checkAuth = require('../middleware/check-auth');

router.post("/signup", UserController.user_signup);

router.post("/login", UserController.user_login);

router.delete("/delete/:userId", checkAuth, UserController.user_delete);

router.get("/profile", checkAuth, UserController.user);

 router.get("/find/:userId", checkAuth, UserController.findUser);

module.exports = router;