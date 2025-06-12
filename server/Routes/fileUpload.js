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


// Get file upload data

router.get("/getAllProducts", verifyToken, async (req, res) => {
    const seller_id = req.userId
    try{
       const sql =  "SELECT product_id, product_title, selling_price, quantity FROM products WHERE seller_id = ?"
       db.query(sql,[seller_id],(err,result)=>{
        if(err){
            console.error("Fetching error",err)
            res.status(500).json({message:"Database error"})
        }
        return res.status(200).json({products:result,
            length : result.length
        })
        
       })

    }catch(err){
        console.error("err",err);
        res.status(500).json({message:"Internal server error"})
    }
})
  


module.exports = router;
