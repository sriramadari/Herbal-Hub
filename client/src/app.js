import React from "react";
import Productlists from "./components/productlist";
import Homepage from "./components/Homepage";
import Product from "./components/product";
import Products from "./components/products";
import Signupform from "./components/signupform";
import Loginform from "./components/login";
import { BrowserRouter as Router, Routes, Route,Link} from "react-router-dom";

import RequireAuth from "./components/auth";

function App() {

  const herbalPlantsData = [
    {
      id: 1,
      name: 'Plant 1',
      image: 'path-to-image1.jpg',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      id: 2,
      name: 'Plant 2',
      image: 'path-to-image1.jpg',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      id: 3,
      name: 'Plant 3',
      image: 'path-to-image1.jpg',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    // Add more plant objects as needed
  ];
  

  return (
    <Router>
   
      <div className="App">
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/products" element={<Products/>}>
             <Route index element={<Productlists plants={herbalPlantsData}/>} />
             <Route path=":id" element={<Product plants={herbalPlantsData} />} />
          </Route>
          <Route path="/contact" element={<Homepage />}></Route>

           <Route path="/login" element={ <Loginform />}>
          </Route>  
          <Route path="/signup" element={ <Signupform />}>
          </Route>
        </Routes>
        
      </div>
    </Router>
  );
}

export default App;
