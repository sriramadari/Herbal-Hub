import React from "react";
import {useParams} from "react-router-dom";
import plantsData from "./plantsdata";
function Product() {
    const { id } = useParams();
    const product = plantsData[id];
    if(!product) {
      return <span>The product you've requested doesn't exist.</span>;
    }
    const { name,url, description } = product;
    return (
      <div >

        <h3>{name}</h3>
        <img src={url} alt="plant"></img>
        <p>{description}</p>
      </div>
    );
  }

  export default Product;