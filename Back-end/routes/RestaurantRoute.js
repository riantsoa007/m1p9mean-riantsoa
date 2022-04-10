const express = require("express");
const router = express.Router();

const checkAuth = require('../middleware/check-auth');
const roleAuth =  require('../middleware/check-role');

const RestaurantController = require('../controllers/RestaurantController');

router.get("/find",checkAuth,roleAuth.isResponsable, RestaurantController.findAllRestaurant);
router.post("/create",checkAuth,roleAuth.isResponsable, RestaurantController.create);

module.exports = router;