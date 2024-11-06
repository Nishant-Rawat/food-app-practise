const categoryModel = require("../models/categoryModel");

const createCategoryController = async (req, res) => {
  try {
    const { title, imageUrl } = req.body;
    if (!title) {
      return res.status(500).send({
        success: false,
        message: "Please provide title.",
        error,
      });
    }
    const newCategory = new categoryModel({
      title,
      imageUrl,
    });
    newCategory.save();
    return res.status(200).send({
      success: true,
      message: "New category added successfully",
      newCategory,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Error in Create Category API",
      error,
    });
  }
};

const getAllCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.find({});
    if (!category) {
      return res.status(404).send({
        success: true,
        message: "No category found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Category List data",
      meta: {
        total: category.length,
      },
      category,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Error in Get All Category API",
      error,
    });
  }
};

const updateCategoryByIdController = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const { title, imageUrl } = req.body;
    const updatedCategory = await categoryModel.findByIdAndUpdate(
      categoryId,
      {
        title,
        imageUrl,
      },
      { new: true }
    );
    if (!updatedCategory) {
      return res.status(500).send({
        success: false,
        message: "Please provide valid category id",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Category successfully updated",
      updatedCategory,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Error in Update Category By API",
      error,
    });
  }
};

const deleteCategoryByIdController = async (req, res) => {
  try {
    const categoryId = req.params.id;
    if (!categoryId) {
      return res.status(404).send({
        success: true,
        message: "Please provide category id",
      });
    }
    await categoryModel.findByIdAndDelete(categoryId);
    return res.status(200).send({
      success: true,
      message: "Category successfully deleted",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Error in Delete Category API",
      error,
    });
  }
};

module.exports = {
  createCategoryController,
  getAllCategoryController,
  updateCategoryByIdController,
  deleteCategoryByIdController,
};
