const restaurantModel = require("../models/restaurantModel");

const createRestaurantController = async (req, res) => {
  try {
    const {
      title,
      foods,
      imageUrl,
      time,
      delivery,
      pickup,
      isOpen,
      rating,
      ratingCount,
      coords,
      code,
      logoUrl,
    } = req.body;
    if (!title || !coords) {
      return res.status(500).send({
        success: false,
        message: "Please provide title and coords",
        error,
      });
    }
    const newRestaurant = new restaurantModel({
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    });
    await newRestaurant.save();
    return res.status(200).send({
      success: true,
      message: "New restaurant added successfully",
      newRestaurant,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Error in Create Restaurant API",
      error,
    });
  }
};

const getAllRestaurantController = async (req, res) => {
  try {
    const restaurant = await restaurantModel.find({});
    if (!restaurant) {
      return res.status(404).send({
        success: true,
        message: "Restaurant not found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "List of restaurant",
      restaurant,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Error in Get All Restaurant API",
      error,
    });
  }
};

const getRestaurantByIdController = async (req, res) => {
  try {
    const restaurant = await restaurantModel.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).send({
        success: true,
        message: "Restaurant not found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Restaurant data for requested id",
      restaurant,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Error in Get Restaurant By Id API",
      error,
    });
  }
};

const deleteRestaurantByIdController = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    if (!restaurantId) {
      return res.status(404).send({
        success: true,
        message: "Please provide restaurant id",
      });
    }
    await restaurantModel.findByIdAndDelete(restaurantId);
    return res.status(200).send({
      success: true,
      message: "Restaurant successfully deleted",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Error in Delete Restaurant API",
      error,
    });
  }
};

module.exports = {
  createRestaurantController,
  getAllRestaurantController,
  getRestaurantByIdController,
  deleteRestaurantByIdController,
};
