const express = require("express");
const router = express.Router();
const Order = require("../models/order.js");
const cors = require('cors');
const app = express();
app.use(cors());

app.post("/orders",cors(), async (req, res) => {
  try {
    const { productid,
        quantity,
        deliveryDetails,
        // userId,
        // price
        } = req.body;

  
    // const orderPlacedDate = new Date();
    // const estimatedDeliveryDate = new Date(orderPlacedDate);
    // estimatedDeliveryDate.setDate(orderPlacedDate.getDate() + 7); // Add 7 days

   
    const neworder = new Order({
      productId:productid,
      quantity: quantity,
    //   deliveryDetails: deliveryDetails,
    //   userId: userId,
    //   price:price,
    //   estimatedDelivery: estimatedDeliveryDate,
    //   orderdate: orderPlacedDate
    });

    // Save the order to the database
    const savedOrder = await neworder.save();

    // Respond with the saved order
    res.json(savedOrder);
  } catch (error) {
    // Handle errors, e.g., send an error response
    console.error("Error placing order:", error);
    res.status(500).json({ error: "Error placing order. Please try again." });
  }
});

module.exports = router;

