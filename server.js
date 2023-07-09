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
  password: String,
  cart:[
    {
      id:Number,
     name:String,
      price:String,
      quantity:Number
    }
  ]
});

const User = mongoose.model("User",userSchema);
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
  try {
    const { cartItems, userId } = req.body;

    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // cartItems.forEach(async (cartItem) => {
      // const filter = {
      //   _id: userId,
      //   cart: {
      //     $elemMatch: { id: cartItems.id }
      //   }
      // };
      
      // const update = {
      //   $inc: { "cart.$.quantity": cartItems.quantity }
      // };
      
      // const result = await User.updateOne(filter, update);
      
      // if (result.nModified === 0) {
      //   // If no matching cart item found, add it to the cart
       
      // }
      user.cart.push(...cartItems);
      await user.save();
    // });
    res.json({ message: 'Cart items updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});


app.get("/products/cart",cors(),async(req,res)=>{
  try{
    const {ID}  = req.query;
    const user = await User.findOne({_id:ID});

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Retrieve the cart data from the user document
    const cartData = user.cart;

    // Send the cart data in the response
    res.json({ cartItems: cartData });
  } catch (error) {
    // Handle any errors
    res.status(500).json({ error: 'An error occurred' });
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