const db = require("../Database/register");
const express = require("express");
const router = express.Router();

router.get("/homePage", async (req, res) => {
  try {
    const sql = `SELECT product_id, product_image1,product_title,selling_price,mrp,quantity FROM products`;
    db.query(sql, (err, result) => {
      if (err) {
        console.log("Fetching error", err);
        return res.status(500).json({ message: "Database error" });
      }
      return res.status(200).json({ result });
    });
  } catch (err) {
    console.error("err", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/productDesc/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const sql = `SELECT  product_image1,product_description,product_image2,product_image3,product_title,selling_price,mrp,quantity FROM products WHERE product_id = ?`;
    db.query(sql, [id], (err, result) => {
      if (err) {
        console.log("Fetching error", err);
        return res.status(500).json({ message: "Database error" });
      }
      if (result.length === 0) {
        return res.status(404).json({ message: "Product not found" });
      }
      return res.status(200).json({ result });
    });
  } catch (err) {
    console.error("err", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
