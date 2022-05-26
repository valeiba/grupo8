const express = require("express");
const router = express.Router();
const controller = require("../controllers/productsController");


router.get("/detail",controller.detail);
router.get("/add", controller.addProduct);
router.get("/edit", controller.editProduct);

module.exports = router;