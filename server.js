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
// Routes
app.get('/',cors(), (req, res) => {
  res.send('Hello, world!');
});

app.post("/login",cors(),async (req,res)=>{
  const {email,password}=req.body;
 try{ 
  const userfound = await User.findOne({email,password});
  if(userfound){ 
    const token = jwt.sign({ userId: userfound._id}, secret);
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
// Start the server

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
