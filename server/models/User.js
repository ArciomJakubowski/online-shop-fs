const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String },
    sex: { type: String, enum: ["male", "female", "other"] },
    name: { type: String },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = model("User", schema);
