const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    brand: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    discountPercentage: { type: Number, required: true },
    images: { type: Array, required: true },
    price: { type: Number, required: true },
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    rating: { type: Number, required: true },
    stock: { type: Number, required: true },
    thumbnail: { type: String, required: true },
    title: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = model("Favorites", schema);
