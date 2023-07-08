import React ,{useState} from "react";
import Productlists from "./components/productlist";
import Homepage from "./components/Homepage";
import Product from "./components/product";
import Products from "./components/products";
import Signupform from "./components/signupform";
import Loginform from "./components/login";
import Logout from "./components/logout";
import CartPage from "./components/cart";
import { BrowserRouter as Router, Routes, Route,Link} from "react-router-dom";

// import RequireAuth from "./components/auth";

function App() {

  const herbalPlantsData = [
    {
      id: 1,
      name: 'Plant 1',
      image: 'path-to-image1.jpg',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      price:'₹199'
    },
    {
      id: 2,
      name: 'Plant 2',
      image: 'path-to-image1.jpg',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      price:'₹299'
    },
    {
      id: 3,
      name: 'Plant 3',
      image: 'path-to-image1.jpg',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      price:'₹399'
    },
    {
      id: 4,
      name: 'Plant 1',
      image: 'path-to-image1.jpg',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      price:'₹249'
    }, {
      id: 5,
      name: 'Plant 1',
      image: 'path-to-image1.jpg',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      price:'₹299'
    }, {
      id: 6,
      name: 'Plant 1',
      image: 'path-to-image1.jpg',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      price:'₹499'
    },
    // Add more plant objects as needed
  ];
  
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/products" element={<Products/>}>
             <Route index element={<Productlists plants={herbalPlantsData}/>} />
             <Route path=":id" element={<Product plants={herbalPlantsData} />} />
             <Route path="cart" element={ <CartPage />}/>
          </Route>
          <Route path="/contact" element={<Homepage />}></Route>
           <Route path="/login" element={ <Loginform  />}>
          </Route>  
          <Route path="/logout" element={ <Logout />}>
          </Route>  
          <Route path="/signup" element={ <Signupform />}>
          </Route>
        </Routes>
        {/* isAuthenticated={token},setAuthentication={token} */}
      </div>
    </Router>
  );
}

export default App;
