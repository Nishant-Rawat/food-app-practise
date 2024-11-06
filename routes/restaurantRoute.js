const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createRestaurantController,
  getAllRestaurantController,
  getRestaurantByIdController,
  deleteRestaurantByIdController,
} = require("../controllers/restaurantController");

const router = express.Router();

//routes
//createRestaurant || POST
router.post("/create", authMiddleware, createRestaurantController);
//getAllRestaurant || GET
router.get("/getAll", getAllRestaurantController);
//getRestaurantById || GET
router.get("/get/:id", getRestaurantByIdController);
//deleteRestaurantById || DELETE
router.delete("/delete/:id", authMiddleware, deleteRestaurantByIdController);

module.exports = router;
