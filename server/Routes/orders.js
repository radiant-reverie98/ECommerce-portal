const express = require('express');
const router = express.Router();
const db = require('../Database/register'); 
const verifyBuyerToken = require('../middleware/verifyBuyerToken.middleware');
const verifyToken = require('../verifyToken');

// Place order and move cart items to order_items

// Place order and move cart items to order_items
router.post('/sendCartToOrders', verifyBuyerToken, (req, res) => {
    try {
        const buyerId = req.userId;

        const orderSql = `INSERT INTO orders (buyer_id, order_status) VALUES (?, ?)`;
        db.query(orderSql, [buyerId, 'Pending'], (err, orderResult) => {
            if (err) return res.status(500).json({ message: err.message });

            const orderId = orderResult.insertId;

            const fetchCartSql = `SELECT product_id, quantity FROM cart WHERE buyer_id = ?`;
            db.query(fetchCartSql, [buyerId], (err, cartItems) => {
                if (err) return res.status(500).json({ message: err.message });

                if (!cartItems.length) {
                    return res.status(400).json({ message: "Cart is empty" });
                }

                const orderItemsSql = `INSERT INTO order_items (order_id, product_id, quantity) VALUES ?`;
                const values = cartItems.map(item => [orderId, item.product_id, item.quantity]);

                db.query(orderItemsSql, [values], (err, result) => {
                    if (err) return res.status(500).json({ message: err.message });

                    // STEP 1: Deduct quantity from products table
                    let updateCount = 0;

                    cartItems.forEach(item => {
                        const updateStockSql = `UPDATE products SET quantity = quantity - ? WHERE product_id = ? AND quantity >= ?`;
                        db.query(updateStockSql, [item.quantity, item.product_id, item.quantity], (err, updateResult) => {
                            if (err) console.error("Stock update failed:", err.message);

                            updateCount++;
                            // Once all updates are done, proceed to delete the cart
                            if (updateCount === cartItems.length) {
                                const deleteCartSql = `DELETE FROM cart WHERE buyer_id = ?`;
                                db.query(deleteCartSql, [buyerId], (err, deleteResult) => {
                                    if (err) return res.status(500).json({ message: err.message });

                                    return res.status(200).json({
                                        message: "Order placed and stock updated successfully",
                                        orderId: orderId
                                    });
                                });
                            }
                        });
                    });
                });
            });
        });

    } catch (err) {
        return res.status(500).json({ message: "Internal server error" });
    }
});

router.get('/getAllOrders', (req, res) => {
  try {
    const sql = `
      SELECT 
        p.product_title,
        oi.quantity,
        b.buyer_name AS buyer_name,
        DATE_FORMAT(o.created_at, '%Y-%m-%d') AS date,
        DATE_FORMAT(o.created_at, '%H:%i') AS time
      FROM orders o
      JOIN order_items oi ON o.order_id = oi.order_id
      JOIN products p ON oi.product_id = p.product_id
      JOIN buyer b ON o.buyer_id = b.buyer_id
      ORDER BY o.created_at DESC
    `;

    db.query(sql, (err, result) => {
      if (err) return res.status(500).json({ message: err.message });
      return res.status(200).json({ orders: result });
    });

  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
});


router.get('/myorders', verifyBuyerToken, (req, res) => {
  const buyerId = req.userId;

  const sql = `
    SELECT 
      p.product_title,
      p.product_description,
      p.product_image1,
      oi.quantity,
      oi.order_status
    FROM orders o
    JOIN order_items oi ON o.order_id = oi.order_id
    JOIN products p ON oi.product_id = p.product_id
    WHERE o.buyer_id = ?
    ORDER BY o.created_at DESC
  `;

  db.query(sql, [buyerId], (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    return res.status(200).json({ orders: result });
  });
});

// Getting orders for seller tracking
router.get('/sellerTrackOrders', verifyToken, (req, res) => {
  const sellerId = req.userId;

  const sql = `
    SELECT  oi.order_item_id, o.order_id, oi.quantity,
           p.product_title, p.product_image1,oi.order_status ,
           b.buyer_name AS buyer_name
    FROM orders o
    JOIN order_items oi ON o.order_id = oi.order_id
    JOIN products p ON oi.product_id = p.product_id
    JOIN buyer b ON o.buyer_id = b.buyer_id
    WHERE p.seller_id = ?
    ORDER BY o.order_id DESC;
  `;

  db.query(sql, [sellerId], (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    return res.status(200).json({ orders: result });
  });
});


// Update order status
router.put('/updateStatus/:order_item_id', verifyToken, (req, res) => {
  const order_item_id = req.params.order_item_id;
  const { order_status } = req.body;

  const sql = `UPDATE order_items SET order_status = ? WHERE order_item_id = ?`;

  db.query(sql, [order_status, order_item_id], (err, result) => {
    if (err) {
      console.error("Error updating order status:", err);
      return res.status(500).json({ message: err });
    }
    return res.status(200).json({ message: "Order status updated successfully" });
  });
});

module.exports = router;

