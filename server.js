require('dotenv').config(); 
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const secret=process.env.SECRET;
const nodemailer = require('nodemailer');
const NodeCache = require('node-cache');
const cache = new NodeCache();
const crypto = require('crypto');
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const port = process.env.PORT || 5000;
app.use(express.static("public"));
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
      user: process.env.MAIL,
      pass: process.env.PASSWORD
  },
  tls: {
    rejectUnauthorized: false,
  },
});
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
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  otp: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
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

app.post("/otprequest", cors(), async (req, res) => {
  try {
    const { email } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log(existingUser);
      return res.json({ message: 'User already exists' });
    }

    const otp = crypto.randomInt(100000, 999999);
    cache.set(email, otp.toString());
    console.log(otp);

    const mailOptions = {
      from: process.env.MAIL,
      to: email,
      subject: 'Email Confirmation OTP for Herbal Hub',
      text: `Your OTP for email confirmation is: ${otp}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }

      console.log('Email sent:', info);
      return res.status(201).json({ message: info });
    });
  } catch (error) {
    console.error('Error during OTP request:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post("/success",cors(),async(req,res)=>{
  const {email,username}=req.body;
  const mailOptions = {
    from: 'lakshmisriramadari1427@gmail.com',
    to: email,
    subject: 'Successfully Registered for Herbal Hub',
    text: `Dear ${username},

    Thank you for creating an account on Herbal Hub! We're excited to have you join our community.
    
    Please feel free to explore our website and discover a wide range of herbal products. If you have any questions or need assistance, don't hesitate to reach out to our support team.
    
    Once again, welcome to Herbal Hub! We look forward to serving you and providing you with a delightful herbal shopping experience.
    
    Best regards,
    The Herbal Hub Team
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }

    console.log('Email sent:', info);
    return res.status(201).json({ message: 'Email sent successfully' });
  });
})

app.post("/verify-otp",cors(),async (req,res)=>{

try{
  const {
    username,email,password,phoneNumber,otp
  } = req.body;
  const storedOtp = cache.get(email);
  
  if(storedOtp&&storedOtp===otp){
    const newUser= new User({
      email,
      username,
      password,
      phoneNumber
    })
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  }else {
    res.status(400).json({ message: 'Invalid OTP' });
  }  
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
        return res.json({ message: "Item already exists in cart"}); 
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

    return res.json({ message: "Items added to cart" });
  } catch (error) {
    console.error("Error updating cart items:", error);
    return res.status(500).json({ message: "Failed to update cart items" });
  }
});
app.post("/cart", async (req, res) => {
  const { itemid,
    newQuantity } = req.body;
  try {
      const existingCartItem = await CartItem.findOne({ _id:itemid });

      if (existingCartItem) {
        // Update quantity for existing cart item
        existingCartItem.quantity= newQuantity;
        await existingCartItem.save();
        return res.json({ message: "Cart Quantity updated successfully" });
      }
    return res.json({ message: "Cart item not found" });
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
app.post("/delete",cors(),async(req,res)=>{
  const { itemid} = req.body;
  try {
       await CartItem.deleteOne({ _id:itemid });
    return res.json({ message: "Item removed from cart" });
  } catch (error) {
    console.error("Error in removing cart item:", error);
    return res.status(500).json({ message: "Failed to update cart items" });
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