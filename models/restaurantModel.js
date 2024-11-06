const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
    },
    imageUrl: {
      type: String,
    },
    foods: {
      type: Array,
    },
    time: {
      type: Array,
    },
    pickup: {
      type: Boolean,
      default: true,
    },
    delivery: {
      type: Boolean,
      default: true,
    },
    isOpen: {
      type: Boolean,
      default: true,
    },
    logoUrl: {
      type: String,
    },
    rating: {
      type: Number,
      default: 1,
      min: 1,
      max: 5,
    },
    ratingCount: {
      type: String,
    },
    code: {
      type: String,
    },
    coords: {
      lat: {
        type: String,
      },
      latDelta: {
        type: String,
      },
      long: {
        type: String,
      },
      longDelta: {
        type: String,
      },
      address: {
        type: String,
      },
      title: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("restaurant", restaurantSchema);
