import React ,{useState} from "react";
import Contact from "./components/contact";
import Productlists from "./components/productlist";
import Homepage from "./components/Homepage";
import Product from "./components/product";
import Products from "./components/products";
import Signupform from "./components/signupform";
import Loginform from "./components/login";
import Logout from "./components/logout";
import CartPage from "./components/cart";
import Orders from "./components/orders";
import Checkout from "./components/checkout";
import { BrowserRouter as Router, Routes, Route,Link} from "react-router-dom";

// import RequireAuth from "./components/auth";

function App() {
  
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/products" element={<Products/>}>

          <Route index element={<Productlists/>} />
             <Route path=":id" element={<Product />} />
             <Route path="cart" element={ <CartPage />}/>        
             <Route path="checkout" element={<Checkout />} />
        
             <Route path="orders" element={ <Orders />}/>
             
          </Route>
          
          <Route path="/contact" element={<Contact />}></Route>
           <Route path="/login" element={ <Loginform  />}>
          </Route>  
          <Route path="/logout" element={ <Logout />}>
          </Route>  
          <Route path="/signup" element={ <Signupform />}>
          </Route>
        </Routes>
        {/* isAuthenticated={token},setAuthentication={token} */}
    </Router>
  );
}

export default App;
