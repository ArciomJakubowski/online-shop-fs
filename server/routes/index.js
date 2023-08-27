const express = require("express");
const router = express.Router({ mergeParams: true });

router.use("/auth", require("./auth.routes"));
router.use("/carts", require("./carts.routes"));
router.use("/favorites", require("./favorites.routes"));
router.use("/products", require("./products.routes"));
router.use("/users", require("./users.routes"));

module.exports = router;
