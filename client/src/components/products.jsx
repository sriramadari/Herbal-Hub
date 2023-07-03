import React from "react";
import { Outlet } from "react-router-dom";


function Products({plants}) {
    return (
      <div style={{ padding: 20 }}>
        <h2>Blog</h2>
        <Outlet plants={plants}/>
      </div>
    );
  }

  export default Products;