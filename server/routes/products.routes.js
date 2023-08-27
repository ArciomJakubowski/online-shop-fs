const express = require("express");
const Product = require("../models/Product");
const auth = require("../middleware/auth.middleware");

const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  try {
    const list = await Product.find();
    res.status(200).send(list);
  } catch (error) {
    res
      .status(500)
      .json({ message: "На сервере произошла ошибка. Попробуйте позже." });
  }
});

router
  .route("/:productId")
  .post(auth, async (req, res) => {
    try {
      const newProduct = await Product.create({
        ...req.body,
      });
      res.status(201).send(newProduct);
    } catch (error) {
      res
        .status(500)
        .json({ message: "На сервере произошла ошибка. Попробуйте позже. " });
    }
  })

  .patch(auth, async (req, res) => {
    try {
      const { productId } = req.params;
      const updateProduct = await Product.findByIdAndUpdate(
        productId,
        req.body,
        { new: true }
      );
      res.status(200).send(updateProduct);
    } catch (error) {
      res
        .status(500)
        .json({ message: "На сервере произошла ошибка. Попробуйте позже." });
    }
  })

  .delete(auth, async (req, res) => {
    try {
      const { productId } = req.params;
      await Product.findByIdAndRemove(productId);
      return res.send(null);
    } catch (error) {
      res
        .status(500)
        .json({ message: "На сервере произошла ошибка. Попробуйте позже. " });
    }
  });

module.exports = router;
