const express = require("express");
const {
  getUserController,
  updateUserController,
  resetPasswordController,
  updatePasswordController,
  deleteUserController,
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

//routes
//getUser || GET
router.get("/getUser", authMiddleware, getUserController);
//updateUser || PUT
router.put("/updateUser", authMiddleware, updateUserController);
//resetPassword || POST
router.post("/resetPassword", authMiddleware, resetPasswordController);
//updatePassword || POST
router.post("/updatePassword", authMiddleware, updatePasswordController);
//deleteUser || DELETE
router.delete("/deleteUser/:id", authMiddleware, deleteUserController);

module.exports = router;
