const express = require('express');
const router = express.Router();
const db = require('../Database/register'); 
const verifyBuyerToken = require('../middleware/verifyBuyerToken.middleware');

// Place order and move cart items to order_items
router.post('/sendCartToOrders', verifyBuyerToken, (req, res) => {
    try {
        const buyerId = req.userId;

        // 1. Insert into orders
        const orderSql = `INSERT INTO orders (buyer_id, order_status) VALUES (?, ?)`;
        db.query(orderSql, [buyerId, 'Pending'], (err, orderResult) => {
            if (err) return res.status(500).json({ message: err.message });

            const orderId = orderResult.insertId;

            // 2. Fetch items from cart
            const fetchCartSql = `SELECT product_id, quantity FROM cart WHERE buyer_id = ?`;
            db.query(fetchCartSql, [buyerId], (err, cartItems) => {
                if (err) return res.status(500).json({ message: err.message });

                if (!cartItems.length) {
                    return res.status(400).json({ message: "Cart is empty" });
                }

                // 3. Prepare order_items insert
                const orderItemsSql = `INSERT INTO order_items (order_id, product_id, quantity) VALUES ?`;
                const values = cartItems.map(item => [orderId, item.product_id, item.quantity]);

                db.query(orderItemsSql, [values], (err, result) => {
                    if (err) return res.status(500).json({ message: err.message });

                    // 4. Clear cart
                    const deleteCartSql = `DELETE FROM cart WHERE buyer_id = ?`;
                    db.query(deleteCartSql, [buyerId], (err, deleteResult) => {
                        if (err) return res.status(500).json({ message: err.message });

                        return res.status(200).json({
                            message: "Order placed successfully",
                            orderId: orderId
                        });
                    });
                });
            });
        });

    } catch (err) {
        return res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;


module.exports = router;