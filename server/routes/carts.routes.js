const express = require("express");
const auth = require("../middleware/auth.middleware");
const Cart = require("../models/Cart");
const router = express.Router({ mergeParams: true });

router.get("/", auth, async (req, res) => {
  try {
    const list = await Cart.find();
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
      const newCart = await Cart.create({
        ...req.body,
        userId: req.user._id,
      });
      res.status(201).send(newCart);
    } catch (error) {
      res.status(500).json({
        message: "На сервере произошла ошибка. Попробуйте позже.",
      });
    }
  })

  .patch(auth, async (req, res) => {
    try {
      const { productId } = req.params;
      const updateCart = await Cart.findByIdAndUpdate(productId, req.body, {
        new: true,
      });
      if (updateCart.userId.toString() === req.user._id) {
        res.status(200).send(updateCart);
      } else {
        res.status(401).json({
          message: "Unauthrized",
        });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "На сервере произошла ошибка. Попробуйте позже." });
    }
  })

  .delete(auth, async (req, res) => {
    try {
      const { productId } = req.params;
      const removedCart = await Cart.findById(productId);
      if (removedCart.userId.toString() === req.user._id) {
        await Cart.findByIdAndRemove(productId);
        return res.send(null);
      } else {
        res.status(401).json({ message: "Unauthorized" });
      }
    } catch (error) {
      res.status(500).json({
        message: "На сервере произошла ошибка. Попробуйте позже.",
      });
    }
  });

module.exports = router;
