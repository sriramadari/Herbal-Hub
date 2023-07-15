import React from "react";
import { Outlet } from "react-router-dom";
import useAuth from "./auth";

function Products({plants}) {
  // useAuth();
    return (
      <div >
        <Outlet plants={plants}/>
      </div>
    );
  }

  export default Products;