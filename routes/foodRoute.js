const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createFoodController,
  getAllFoodController,
  getFoodByIdController,
  getFoodByRestaurantIdController,
  updateFoodByIdController,
  deleteFoodByIdController,
} = require("../controllers/foodContoller");

const router = express.Router();

//routes
//createCategory || POST
router.post("/create", authMiddleware, createFoodController);
//getAll || GET
router.get("/getAll", getAllFoodController);
//getById || GET
router.get("/get/:id", getFoodByIdController);
//getByRestaurant || GET
router.get("/getByRestaurantId/:id", getFoodByRestaurantIdController);
// updateFoodByIdController || PUT
router.put("/update/:id", authMiddleware, updateFoodByIdController);
//deleteById || DELETE
router.delete("/delete/:id", authMiddleware, deleteFoodByIdController);
//placeOrder || POST
// router.post("/placeOrder", authMiddleware, placeOrderController);

module.exports = router;
