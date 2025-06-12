const express = require('express');
const upload = require('../middleware/multerConfig');
const router = express.Router();
const db = require('../Database/register.js');
const verifyToken = require('../verifyToken.js');

router.post('/uploadProduct', verifyToken, upload.array("image[]", 3), async (req, res) => {
  try {
    const {
      product_title,
      product_description,
      mrp,
      selling_price,
      quantity
    } = req.body;

    const seller_id = req.userId;
    console.log(req.user)
    if (!seller_id) {
      return res.status(401).json({ error: "Unauthorized user." });
    }

    if (!req.files || req.files.length !== 3) {
      return res.status(400).json({ error: "Exactly 3 images are required." });
    }

    const [img1, img2, img3] = req.files.map(file => file.filename);

    const query = `
      INSERT INTO products 
        (seller_id, product_title, product_description, product_image1, product_image2, product_image3, mrp, selling_price, quantity)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await db.execute(query, [
      seller_id,
      product_title,
      product_description,
      img1,
      img2,
      img3,
      mrp,
      selling_price,
      quantity
    ]);

    res.status(200).json({
      message: 'Product uploaded successfully',
      product: {
        product_title,
        product_description,
        product_image1: img1,
        product_image2: img2,
        product_image3: img3,
        mrp,
        selling_price,
        quantity
      }
    });

  } catch (err) {
    console.error("Error uploading product:", err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
