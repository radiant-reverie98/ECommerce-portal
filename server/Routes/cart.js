const express = require('express')
const verifyBuyerToken = require('../middleware/verifyBuyerToken.middleware')
const router = express.Router()
const db = require('../Database/register')


// Add to cart

router.post('/addToCart', verifyBuyerToken, (req, res) => {
  try {
    const buyerId = req.userId;
    const { product_id, quantity } = req.body;

    if (!product_id || !quantity) {
      return res.status(400).json({ message: "Product ID and quantity are required" });
    }

    // Step 1: Check if product already exists in cart
    const checkSql = `SELECT * FROM cart WHERE buyer_id = ? AND product_id = ?`;
    db.query(checkSql, [buyerId, product_id], (err, result) => {
      if (err) return res.status(500).json({ message: err.message });

      if (result.length > 0) {
        // Step 2: Product exists, so update quantity
        const updatedQuantity = result[0].quantity + quantity;

        const updateSql = `UPDATE cart SET quantity = ? WHERE buyer_id = ? AND product_id = ?`;
        db.query(updateSql, [updatedQuantity, buyerId, product_id], (err, updateResult) => {
          if (err) return res.status(500).json({ message: err.message });

          return res.status(200).json({ message: "Cart item quantity updated successfully" });
        });

      } else {
        // Step 3: Product doesn't exist, insert new
        const insertSql = `INSERT INTO cart (buyer_id, product_id, quantity) VALUES (?, ?, ?)`;
        db.query(insertSql, [buyerId, product_id, quantity], (err, insertResult) => {
          if (err) return res.status(500).json({ message: err.message });

          return res.status(201).json({ message: "Product added to cart" });
        });
      }
    });

  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
})

// Get cart items

router.get('/view',verifyBuyerToken,(req,res)=>{
    try{
        const buyer_id = req.userId
        const sql = `SELECT c.cart_id, c.product_id, c.quantity, p.product_title, p.selling_price
    FROM cart c
    JOIN products p ON c.product_id = p.product_id
    WHERE c.buyer_id = ?`
        db.query(sql,[buyer_id],(err,result)=>{
            if(err) res.status(500).json({message : err})
            return res.status(200).json({message : result})
        })
    }catch(err){
        return res.status(500).json({message : "Internal server error"})
    }
})


router.delete('/delete/:productId',verifyBuyerToken,(req,res)=>{
    try{
        const {productId} = req.params;
        const buyerId = req.userId
        const sql = `DELETE FROM cart WHERE buyer_id = ? AND product_id = ?`
        db.query(sql,[buyerId,productId],(err,result)=>{
            if(err) return res.status(500).json({err : err.message})
            return res.status(200).json({message : result})
        })
    }catch(err){
        res.status(500).json({message : "Internal server error"})
    }
})

module.exports = router