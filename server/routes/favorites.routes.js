const express = require("express");
const Favorites = require("../models/Favorites");
const auth = require("../middleware/auth.middleware");
const router = express.Router({ mergeParams: true });

router.get("/", auth, async (req, res) => {
  try {
    const list = await Favorites.find();
    res.status(200).send(list);
  } catch (error) {
    res.status(500).json({
      message: "НА сервере произошла ошибка. Попробуйте позже.",
    });
  }
});

router
  .route("/:productId")
  .post(auth, async (req, res) => {
    try {
      const newFavorites = await Favorites.create({
        ...req.body,
        userId: req.user._id,
      });
      res.status(201).send(newFavorites);
    } catch (error) {
      res.status(500).json({
        message: " На сервере произошла ошибкаю Поробуйте позже.",
      });
    }
  })
  .delete(auth, async (req, res) => {
    try {
      const { productId } = req.params;
      const removeFavoritesProduct = await Favorites.findById(productId);

      if (removeFavoritesProduct.userId.toString() === req.user._id) {
        await Favorites.findByIdAndRemove(productId);
        res.send(null);
      } else {
        res.status(401).json({ message: "Unauthorized" });
      }
    } catch (error) {
      res.status(500).json({
        message: " На сервере произошла ошибка. Попробуйте позже.",
      });
    }
  });

module.exports = router;
