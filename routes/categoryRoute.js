const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createCategoryController,
  getAllCategoryController,
  updateCategoryByIdController,
  deleteCategoryByIdController,
} = require("../controllers/categoryController");

const router = express.Router();

//routes
//createCategory || POST
router.post("/create", authMiddleware, createCategoryController);
//getAll || GET
router.get("/getAll", getAllCategoryController);
// updateCategoryByIdController || PUT
router.put("/update/:id", authMiddleware, updateCategoryByIdController);
//deleteById || DELETE
router.delete("/delete/:id", authMiddleware, deleteCategoryByIdController);

module.exports = router;
