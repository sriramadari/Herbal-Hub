const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const secret='sriram@adari';
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const port = process.env.PORT || 5000;
app.use(express.static("public"));
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/HerbalHubDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
// Middleware
app.use(bodyParser.json());
app.use(cors());
const userSchema =  new mongoose.Schema ({
  email: String,
  username:String,
  password: String
});

const User = mongoose.model("User",userSchema);
const cartItemSchema = new mongoose.Schema({
  id: String,
  name: String,
  price: Number,
  quantity: Number,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Add a reference to the User schema
});

const CartItem = mongoose.model("CartItem", cartItemSchema);

app.get('/',cors(), (req, res) => {
  res.send('Hello, world!');
});

app.post("/login",cors(),async (req,res)=>{
  const {email,password}=req.body;
 try{ 
  const userfound = await User.findOne({email,password});
  if(userfound){ 
    const token = jwt.sign({ userId: userfound._id,name:userfound.username}, secret);
   return res.status(201).json({ message: 'User login successfully' ,token});
}
return res.status(201).json({ message: 'User Not found' });
}
catch (error) {
  console.error('Error during Login', error);
  res.status(500).json({ message: 'Internal server error' });
}

})


app.post("/signup",cors(),async (req,res)=>{

try{
  const {
    username,email,password
  } = req.body;

const existingUser = await User.findOne({ email });
if (existingUser) {
  return res.status(400).json({ message: 'User already exists' });
}

  const newUser= new User({
    email,
    username,
    password
  })
  await newUser.save();
  res.status(201).json({ message: 'User registered successfully' });
} catch (error) {
  console.error('Error during signup:', error);
  res.status(500).json({ message: 'Internal server error' });
}
})

app.post("/products/cart", async (req, res) => {
  const { cartItems, userId } = req.body;

 
  try {
    // Loop through the cartItems array
    for (const item of cartItems) {
      const existingCartItem = await CartItem.findOne({ user: userId, id: item.id });

      if (existingCartItem) {
        // Update quantity for existing cart item
        existingCartItem.quantity+= item.quantity;
        await existingCartItem.save();
      } else {
        // Create a new cart item
        const newCartItem = new CartItem({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          user: userId,
        });
        await newCartItem.save();
      }
    }

    return res.json({ message: "Cart items updated successfully" });
  } catch (error) {
    console.error("Error updating cart items:", error);
    return res.status(500).json({ message: "Failed to update cart items" });
  }
});


app.get("/products/cart",cors(),async(req,res)=>{
  
    const {ID}  = req.query;
    try {
      // Retrieve the cart items for the user
      const userId = new mongoose.Types.ObjectId(ID);
      const cartItems = await CartItem.find({ user: userId });
      if (!cartItems) {
        return res.status(404).json({ message: "Cart items not found" });
      }
      return res.json({cartItems});
    } catch (error) {
      console.error("Error retrieving cart items:", error);
      return res.status(500).json({ message: "Failed to retrieve cart items" });
    }
})
// Start the server

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


// const existingCartItem = user.cart.find((item) => item.id === cartItems.id);

    // // if (existingCartItem) {
    //   existingCartItem.quantity += cartItems.quantity;
    //   const newQuantity=existingCartItem.quantity;
      // User.findOneAndUpdate(
      //   { 'cart.id': cartItems.id ,'_id':userId},
      //   { $set: { 'cart.$.quantity': 3 } },
      //   { new: true },
      //   (err, updatedUser) => {
      //     if (err) {
      //       console.error('Error updating cart item quantity:', err);
      //       // Handle the error appropriately
      //     } else {
      //       if (!updatedUser) {
      //         console.log('Cart item not found');
      //         // Handle the case when the cart item is not found
      //       } else {
      //         console.log('Cart item quantity updated successfully');
      //         // Handle the success case
      //       }
      //     }
      //   }
      // );
    // } else {
    //   // Add the new cart item if it doesn't exist