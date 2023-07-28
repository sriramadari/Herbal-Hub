const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  productId: {
    type: String,
    
  },
  productname: {
    type: String,
    
  },
  quantity: {
    type: Number,
    
  },
  deliveryDetails: {
    type: Object,
  },
  userId: {
 type: mongoose.Schema.Types.ObjectId, ref: "User"
  },
  price: {
    type: Number,
  },
  estimatedDelivery: {
    type: Date,
    
  },
  orderdate: {
    type: Date,
    
  }
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
