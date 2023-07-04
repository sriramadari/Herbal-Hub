import React from "react";
import { Outlet } from "react-router-dom";
import useAuth from "./auth";

function Products({plants}) {
  useAuth();
    return (
      <div style={{ padding: 20 }}>
        <h2>Blog</h2>
        <Outlet plants={plants}/>
      </div>
    );
  }

  export default Products;