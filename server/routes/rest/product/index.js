const aa = require("express-async-await");
const express = require("express");
const router = express.Router();

const { getProduct, getAllProducts, findProduct, getSameElement, getsameCategory, getImageFromNaver} = require("./product.js");

router.get("/search/:searchName", findProduct);
router.get("/element/:pid", getSameElement);
router.get("/category/:pid", getsameCategory);
router.get('/image', getImageFromNaver);
router.get("/:pid", getProduct);
router.get("/", getAllProducts);

module.exports = router;