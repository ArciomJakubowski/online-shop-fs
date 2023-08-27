const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    price: { type: Number, required: true },
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true },
    thumbnail: { type: String, required: true },
    title: { type: String, required: true },
    total: { type: Number, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  }
  // { timestamps: true }
);

module.exports = model("Cart", schema);
