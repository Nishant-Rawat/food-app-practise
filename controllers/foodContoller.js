const foodModel = require("../models/foodModel");
const orderModel = require("../models/orderModel");

const createFoodController = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailable,
      restaurant,
      rating,
    } = req.body;
    if (!title || !description || !price || !restaurant) {
      return res.status(500).send({
        success: false,
        message: "Please provide all details",
      });
    }
    const newFood = new foodModel({
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailable,
      restaurant,
      rating,
    });
    await newFood.save();
    return res.status(200).send({
      success: true,
      message: "New food added successfully",
      newFood,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Error in Create Food API",
      error,
    });
  }
};

const getAllFoodController = async (req, res) => {
  try {
    const food = await foodModel.find({});
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "No food found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "food List data",
      meta: {
        total: food.length,
      },
      food,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Error in Get All Food API",
      error,
    });
  }
};

const getFoodByIdController = async (req, res) => {
  try {
    const food = await foodModel.findById(req.params.id);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "No food found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "food data",
      food,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Error in Get Food By Id API",
      error,
    });
  }
};

const getFoodByRestaurantIdController = async (req, res) => {
  try {
    const food = await foodModel.find({ restaurant: req.params.id });
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "No food found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "food data for the restaurant id",
      meta: {
        total: food.length,
      },
      food,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Error in Get Food By restaurant API",
      error,
    });
  }
};

const updateFoodByIdController = async (req, res) => {
  try {
    const foodId = req.params.id;
    const food = await foodModel.findById(foodId);
    if (!food) {
      return res.status(500).send({
        success: false,
        message: "Please provide valid food id",
      });
    }
    const {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailable,
      restaurant,
      rating,
    } = req.body;
    const updatedFood = await foodModel.findByIdAndUpdate(
      foodId,
      {
        title,
        description,
        price,
        imageUrl,
        foodTags,
        category,
        code,
        isAvailable,
        restaurant,
        rating,
      },
      { new: true }
    );
    return res.status(200).send({
      success: true,
      message: "Food successfully updated",
      updatedFood,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Error in Update Food API",
      error,
    });
  }
};

const deleteFoodByIdController = async (req, res) => {
  try {
    const foodId = req.params.id;
    if (!foodId) {
      return res.status(404).send({
        success: false,
        message: "Please provide food id",
      });
    }
    await foodModel.findByIdAndDelete(foodId);
    return res.status(200).send({
      success: true,
      message: "Food successfully deleted",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Error in Delete Food API",
      error,
    });
  }
};

module.exports = {
  createFoodController,
  getAllFoodController,
  getFoodByIdController,
  getFoodByRestaurantIdController,
  updateFoodByIdController,
  deleteFoodByIdController,
};
