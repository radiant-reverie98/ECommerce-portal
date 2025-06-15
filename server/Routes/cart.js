const express = require('express')
const verifyBuyerToken = require('../middleware/verifyBuyerToken.middleware')
const router = express.Router()
const db = require('../Database/register')


// Add to cart

router.post('/addToCart',verifyBuyerToken,(req,res)=>{
    try{
        const userId = req.userId;
        const {product_id,quantity} = req.body;
        const sql = `INSERT INTO cart(buyer_id,product_id,quantity)
        VALUES (?,?,?)
        ON DUPLICATE KEY UPDATE quantity = quantity + ?`
        db.query(sql,[userId,product_id,quantity,quantity],(err,result)=>{
            if (err) return res.status(500).json({ message: err.message });
            return res.status(200).json({ message: 'Item added to cart' });
        })
    }
    catch(err){
        return res.status(500).json({message : err.message})
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