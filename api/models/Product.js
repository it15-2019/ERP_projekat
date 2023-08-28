const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    img: { type: String, default: "https://w7.pngwing.com/pngs/446/214/png-transparent-computer-icons-new-product-development-service-window-others-miscellaneous-service-window-thumbnail.png" },
    categories: { type: String },
    size: { type: Array },
    year: { type: Array },
    color: { type: Array },
    type: {type: String, required: true},
    price: { type: Number, required: true },
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
